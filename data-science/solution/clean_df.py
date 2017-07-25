# coding: utf-8
import logging
import numpy as np
import pandas as pd
import sklearn

from preprocessing import preprocess_df
from missing_data import k_means_missing

import utils

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def filter_dtype(df, dtype=object):
    """ Returns dataframe only with columns of type `dtype`
    """
    return df.select_dtypes(include=[dtype])


def calc_quantiles(df):
    """ Calculates percentiles and boundaries for outliers for each column
    """
    low = 0.15
    high = 0.85
    quant_df = df.quantile([low, high])
    quant_df = quant_df.transpose()
    quant_df.columns = [u'low', u'high']
    quant_df[u'IQR'] = quant_df[u'high']-quant_df[u'low']
    quant_df[u'low_boundary'] = quant_df[u'low']-1.5*quant_df[u'IQR']
    quant_df[u'high_boundary'] = quant_df[u'high']+1.5*quant_df[u'IQR']
    return quant_df


def get_outliers(df, col, quant_df):
    """ Gets outliers (values and index)
        :param df: dataframe from which to take outliers
        :param col: target column
        :param quant_df: dataframe with the quantiles and boundaries
        :type df: pandas DataFrame
        :type col: str
        :type quant_df: pandas DataFrame
        :return: returns dictionary with index and values
        :rtype: dict[int, int/float]
    """
    quant_df_col = quant_df.loc[col]
    low_bound = quant_df_col[u'low_boundary']
    high_bound = quant_df_col[u'high_boundary']
    df_outliers = df[(df[col]<low_bound)&(df[col]>high_bound)]
    return df_outliers[col].to_dict()


def deal_with_missing_values(df, use_kmeans=True):
    """ Treats missing values
        :params df: dataframe with missing values
        :params use_kmeans: uses algorithm kmeans to fill null values or
        just fill null values with the median value
        :type df: pandas DataFrame
        :type use_kmeans: bool
        :return: returns dataframe with no missing values
        :rtype: pandas DataFrame
    """
    if use_kmeans:
        quant_df = calc_quantiles(df)
        df_reindex = df.reset_index(drop=True)
        set_outlier_null = lambda row: np.nan \
            if outliers_idx_value.has_key(row.index) else row[col]
        col_outliers = {}
        for col in df_reindex.columns:
            outliers_idx_value = get_outliers(df_reindex, col, quant_df)
            if outliers_idx_value == {}:
                continue
            col_outliers[col] = outliers_idx_value
            df_reindex[col] = df_reindex.apply(set_outlier_null, axis=1)
        X = df_reindex.as_matrix()
        X = k_means_missing(X, n_clusters=10, max_iter=1000)
        df_reindex[:] = X
        get_outlier_back = lambda row, idx_value: idx_value[row.index] \
            if idx_value.has_key(row.index) else row[col]
        for col in df_reindex.columns:
            if not col_outliers.has_key(col):
                continue
            idx_value = col_outliers[col]
            df_reindex[col] = df_reindex.apply(
                get_outlier_back,
                args=[idx_value],
                axis=1
            )
        df[:] = df_reindex.as_matrix()
    else:
        df = df.where(pd.notnull(df), df.median(), axis='columns')
    return df


def remove_id_cols(df, cols):
    """ Remove columns from list `cols` which act like an id for the row
    """
    df_size =len(df)
    cols += [col for col in df.columns.tolist() \
             if col == u'id' or u'Unnamed' in col]
    for col in cols:
        df[col] = df[col].apply(utils.norm_txt)
        unique_values = df[col].unique()
        if len(unique_values) == df_size:
            del df[col]
    return df


def to_numeric(df, dict_label_encoder={}, standard_scaler=None):
    """ Transforms categorical columns to numerical columns
        by applying a label encoder associated with a scaler
    """
    cols_to_change = filter_dtype(df).columns.tolist()
    for col in cols_to_change:
        col_values = df[col].values
        if dict_label_encoder.has_key(col):
            label_encoder = dict_label_encoder[col]
            df[col] = label_encoder.transform(col_values)
        else:
            label_encoder = sklearn.preprocessing.LabelEncoder()
            df[col] = label_encoder.fit_transform(col_values)
    df_aux = df[cols_to_change]
    X = df_aux.as_matrix()
    if standard_scaler:
        scaled_new_X = standard_scaler.transform(X)
    else:
        standard_scaler = sklearn.preprocessing.StandardScaler()
        scaled_new_X = standard_scaler.fit_transform(X)
    df[cols_to_change] = scaled_new_X
    return df, dict_label_encoder, standard_scaler


def process_df(df, remove_cols=[], dict_label_encoder={}, standard_scaler=None):
    """ Cleans and processes dataframe
        :param df: dataframe to process
        :param remove_cols: cols to remove from dataframe
        :type df: pandas DataFrame
        :type remove_cols: list(str)
        :return: returns dataframe ready to use for training and the label
        encoder and standard scaler used for making categorical columns numeric
        :rtype: pandas DataFrame, dict[str, sklearn obj], sklearn obj
    """
    # preprocess df
    df = preprocess_df(
        df,
        remove_cols_with_values={u'pre_approved': [0., np.nan]},
        validate_state=True
    )

    logger.info(u'Removing id columns...')
    categorical_cols = filter_dtype(df, dtype=object).columns.tolist()
    df = remove_id_cols(df, categorical_cols)

    logger.info(u'Converting categorical columns to numeric columns...')
    df, dict_label_encoder, standard_scaler = to_numeric(
        df,
        dict_label_encoder=dict_label_encoder,
        standard_scaler=standard_scaler
    )

    logger.info(u'Dealing with missing values...')
    df = deal_with_missing_values(df)

    if remove_cols:
        logger.info(u'Removing unwanted columns...')
        df_columns = df.columns.tolist()
        selected_cols = [col for col in df_columns if col not in remove_cols]
        df = df[selected_cols]

    return df, dict_label_encoder, standard_scaler
