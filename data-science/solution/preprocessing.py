# coding: utf-8
import logging
import os
import pandas as pd
import regex

from education_level import get_education_level
from get_fipe_data import get_prices_from_auto_models_year, get_auto_price
from norm_purpose import find_purpose_categories
import utils
from zip_state import is_state_valid_from_zipcode

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# disable warnings from pandas
pd.options.mode.chained_assignment = None


def preprocess_df(df, remove_cols_with_values={},
                  validate_state=True):
    """ Preprocesses dataframe
        :param df: input dataframe
        :param remove_cols_with_values: columns to remove from dataframe
        :param validate_state: validate state using the provided zipcode
        :type df: pandas.DataFrame
        :type remove_cols_with_values: dict[str, list(int/float/str)]
        if they have the value specified
        :type validate_state: bool
        :return: returns preprocessed dataframe
        :rtype: pandas.DataFrame
    """
    logger.info(u'Preprocessing dataframe...')

    logger.info(u'Removing duplicated rows...')
    df = df.drop_duplicates(subset=u'id')

    if remove_cols_with_values != {}:
        logger.info(u'Removing unwanted rows...')
        for col, values in remove_cols_with_values.items():
            df = df[df[col].isin(values)==False]

    if validate_state:
        logger.info(u'Validating state from zipcode...')
        get_first_number = lambda x: -1 if utils.is_nan(x) else int(x[0])
        df[u'first_zip'] = df[u'zip_code'].apply(get_first_number)
        df[u'valid_state'] = df.apply(is_state_valid_from_zipcode, axis=1)

    logger.info(u'Getting education level...')
    df[u'education_level'] = df[u'education_level'].apply(get_education_level)

    logger.info(u'Getting FIPE price for the vehicles...')
    list_auto_brands = df[u'auto_brand'].unique().tolist()
    df[u'auto_year'] = df[u'auto_year'].apply(int)
    to_list = lambda df_col: df_col.unique().tolist()
    df_model_year = df.groupby(u'auto_model').agg({'auto_year': to_list})
    df_model_year = df_model_year.reset_index()
    models_years = df_model_year.set_index(u'auto_model')[u'auto_year'].to_dict()
    model_year2price = get_prices_from_auto_models_year(
        models_years,
        list_auto_brands
    )
    df[u'auto_price'] = df.apply(
        lambda row: get_auto_price(
            row[u'auto_model'],
            row[u'auto_year'],
            model_year2price
        ),
        axis=1
    )

    logger.info(u'Creating column discarded from discard_reason...')
    get_discarded_status = lambda reason: int(not utils.is_nan(reason))
    df[u'discarded'] = df[u'discard_reason'].apply(get_discarded_status)

    logger.info(u'Processing landing page name...')
    get_page_name = lambda full_name, index: u'' if utils.is_nan(full_name) \
        else full_name.split(u'/')[index]
    df[u'first_landing_page'] = df[u'landing_page'].apply(get_page_name, args=[1])
    df[u'last_landing_page'] = df[u'landing_page'].apply(get_page_name, args=[-1])
    REG_CARD = regex.compile(ur'card|cartao')
    filter_card = lambda name: u'card' if REG_CARD.search(name) else name
    df[u'last_landing_page'] = df[u'last_landing_page'].apply(filter_card)

    logger.info(u'Processing informed_purpose...')
    purposes = df[u'informed_purpose'].tolist()
    categories = find_purpose_categories(purposes)
    df[u'category_purpose'] = categories

    logger.info(u'Dropping columns with only null values...')
    df = df.dropna(axis=1, how='all')

    return df
