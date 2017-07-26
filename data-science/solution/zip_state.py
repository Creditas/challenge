# coding: utf-8
from utils import is_nan

"""
    Zipcode mapping: first number correspondence to states in Brazil
    Reference:
    https://www.correios.com.br/para-voce/precisa-de-ajuda/o-que-e-cep-e-por-que-usa-lo/estrutura-do-cep'
"""
ZIP_STATE = {
    0: [u'SP'],
    1: [u'SP'],
    2: [u'ES', u'RJ'],
    3: [u'MG'],
    4: [u'BA', u'SE'],
    5: [u'AL', u'PB', u'PE', u'RN'],
    6: [u'AC', u'AM', u'AP', u'CE', u'MA', u'PA', u'PI', u'RR'],
    7: [u'DF', u'GO', u'MS', u'MT', u'RO', u'TO'],
    8: [u'PR', u'SC'],
    9: [u'RS']
}


def find_states_from_zipcode(zipcode):
    """ Finds states list using zipcode first digit
        :param zipcode: first digit of zipcode
        :type zipcode: int
        :return: returns list of states corresponding to that digit
        :rtype: list(str)
        >>> find_states_from_zipcode('4')
        [u'BA', u'SE']
    """
    return ZIP_STATE.get(zipcode, [])


def is_state_valid_from_zipcode(row):
    """ Checks if the state is valid considering the zipcode
        :param row: row containing fields `state` and `first_zip`
        :return: returns 1 if state is valid according to zipcode or 0 otherwise
    """
    state = row[u'state']
    if is_nan(state):
        return 0
    first_digit_zip = row[u'first_zip']
    possible_states = find_states_from_zipcode(first_digit_zip)
    return int(state in possible_states)
