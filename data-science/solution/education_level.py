# coding: utf-8
from collections import OrderedDict

import utils

EDUCATION_LEVEL = OrderedDict([
    (u'analfabeto', 1),
    (u'fundamental completo', 4),
    (u'primário', 2),
    (u'ginásio', 4),
    (u'médio', 5),
    (u'superior', 7)
])


def get_education_level(education_str):
    """ Gets the education level given a string
        :param education_str: education level in words
        :type education_str: str
        :return: returns the numeric level corresponding to `education_str`
        :rtype: int
    """
    if utils.is_nan(education_str):
        return 0
    education_str = education_str.lower()
    for education, educ_level in EDUCATION_LEVEL.items():
        if education in education_str:
            break
    if education in [u'primário', u'médio', u'superior']:
        extra_point = 0 if u'incompl' in education_str else 1
    else:
        extra_point = 0
    return educ_level + extra_point
