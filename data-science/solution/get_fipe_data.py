# coding: utf-8
"""
    Crawl data from FIPE through an API.
    Reference:
    http://fipeapi.appspot.com/
"""
import ast
import numpy as np
import os
import pandas as pd
import regex
import requests
from tqdm import tqdm

import utils

REG_NONDIG = regex.compile(ur'[^\d]')


def get_data_from_url(url):
    """ Get python object from data obtained from url
        :param url: the url address to access
        :type url: str
        :return: returns list of dictionary
        :rtype: list(dict[str, str/int/float])
    """
    retry = 5
    while retry > 0:
        try:
            r = requests.get(url)
            if r.status_code == 200:
                resp = ast.literal_eval(r.text)
            else:
                resp = {}
            retry = 0
        except:
            retry -= 1
    return [resp] if type(resp) == dict else resp


def norm_fipe_name(txt):
    """ Normalizes fipe name
        :rtype str
    """
    txt = txt.encode().decode('unicode-escape')
    return utils.norm_txt(txt)


def fmt_price(price_str):
    if not utils.is_nan(price_str):
        price_str = price_str.split()[-1].split(',')[0]
        price_str = REG_NONDIG.sub(u'', price_str)
        price_str = float(price_str)

    return price_str


def get_auto_brands_id():
    """
        Gets all the brands from FIPE and returns a dictionary with the brands
        and its corresponding ids
        :return: returns dictionary with names and ids
        :rtype: dict[str, int]
    """
    brands_cache_file = u'data/fipe_brands.csv'
    if os.path.exists(brands_cache_file):
        df_brands = pd.read_csv(brands_cache_file, encoding='utf-8')
    else:
        url = u'http://fipeapi.appspot.com/api/1/carros/marcas.json'
        brands_data = get_data_from_url(url)
        df_brands = pd.DataFrame(brands_data)
        df_brands[u'fipe_name'] = df_brands[u'fipe_name'].apply(norm_fipe_name)
        df_brands.to_csv(brands_cache_file, index=False, encoding='utf-8')
    brand_name2id = df_brands.set_index(u'fipe_name')[u'id'].to_dict()
    return brand_name2id


def get_auto_model_ids(list_auto_brands):
    """
        Gets auto model ids (concatenated with the brand_id) from the specified auto
        brands
        :param list_auto_brands: list of the auto brands of interest
        :type list_auto_brands: list(str)
        :return: returns dictionary with the auto model and ids
        :rtype: dict[str, str]
    """
    list_auto_brands = [utils.norm_txt(brand) for brand in list_auto_brands]
    list_auto_brands.sort()
    hash_txt = utils.get_hashed_text(u' '.join(list_auto_brands))
    models_cache_file = u'data/fipe_auto_models_{hash_txt}.csv'.format(
        hash_txt=hash_txt
    )

    if os.path.exists(models_cache_file):
        df_models = pd.read_csv(models_cache_file, encoding='utf-8')
    else:
        brand_name2id = get_auto_brands_id()
        url = u'http://fipeapi.appspot.com/api/1/carros/veiculos/{brand_id}.json'
        df_models = pd.DataFrame()
        for auto_brand in tqdm(list_auto_brands):
            if not brand_name2id.has_key(auto_brand):
                continue
            brand_id = brand_name2id[auto_brand]
            fmt_url = url.format(
                brand_id=brand_id
            )
            models_data = get_data_from_url(fmt_url)
            df_models_brand = pd.DataFrame(models_data)
            if len(df_models_brand):
                df_models_brand[u'fipe_name'] = df_models_brand[u'fipe_name']\
                    .apply(norm_fipe_name)
                df_models_brand[u'brand_name'] = auto_brand
                df_models_brand[u'brand_id'] = brand_id
                df_models = pd.concat([df_models, df_models_brand])

        get_brand_model_id = lambda row: u'{brand_id}/{model_id}'.format(
            brand_id=row[u'brand_id'],
            model_id=row[u'id']
        )
        df_models[u'brand_model_id'] = df_models.apply(
            get_brand_model_id,
            axis=1
        )
        df_models.to_csv(models_cache_file, index=False, encoding='utf-8')

    auto_model2id = df_models.set_index(
        u'fipe_name')[u'brand_model_id'].to_dict()
    return auto_model2id


def get_prices_from_auto_models_year(models_years, list_auto_brands):
    """ Gets prices for all models and all years of `models_years`
        :param models_years: stores auto models and years
        :param list_auto_brands: list of the auto brands of interest
        :type models_year: dict[str, list(int)]
        :type list_auto_brands: list(str)
        :return: returns dictionary with `model-year` and price
        :rtype: dict[str, float]
    """
    hash_txt = utils.get_hashed_text(utils.norm_txt(models_years))
    prices_cache_file = u'data/fipe_prices_{hash_txt}.csv'.format(
        hash_txt=hash_txt
    )

    if os.path.exists(prices_cache_file):
        df_prices = pd.read_csv(prices_cache_file, encoding='utf-8')
    else:
        auto_model2id = get_auto_model_ids(list_auto_brands)
        url = u'http://fipeapi.appspot.com/api/'
        url += u'1/carros/veiculo/{brand_model_id}/{year}-1.json'
        df_prices = pd.DataFrame()
        for auto_model, years in tqdm(models_years.items()):
            auto_model = utils.norm_txt(auto_model)
            if not auto_model2id.has_key(auto_model):
                continue
            brand_model_id = auto_model2id[auto_model]
            for year in years:
                fmt_url = url.format(
                    brand_model_id=brand_model_id,
                    year=year
                )
                price_data = get_data_from_url(fmt_url)
                df_prices_model_year = pd.DataFrame(price_data)
                model_year = u'{auto_model}-{year}'.format(
                    auto_model=auto_model.replace(u' ', u'_'),
                    year=year
                )
                df_prices_model_year[u'model_year'] = model_year
                df_prices_model_year[u'brand_model_id'] = brand_model_id
                df_prices = pd.concat([df_prices, df_prices_model_year])

        df_prices[u'fmt_price'] = df_prices[u'preco'].apply(fmt_price)
        df_prices.to_csv(prices_cache_file, index=False, encoding='utf-8')

    model_year2price = df_prices.set_index(
        u'model_year')[u'fmt_price'].to_dict()
    return model_year2price


def get_auto_price(auto_model, auto_year, model_year2price):
    """ Gets price of `auto_model` from `auto_year` from FIPE
        :param auto_model: model name
        :param auto_year: year of that model
        :param model_year2price: dictionary with model_year and price
        :type auto_model: str
        :type auto_year: int
        :return: returns price of the vehicle
        :rtype: float
    """
    auto_model = utils.norm_txt(auto_model)
    model_year = u'{auto_model}-{year}'.format(
        auto_model=auto_model.replace(u' ', u'_'),
        year=auto_year
    )
    return model_year2price.get(model_year, np.nan)
