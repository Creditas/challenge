# coding: utf-8
"""
    Common utilities
"""
import hashlib
import regex
from unicodedata import normalize

import utils


def norm_txt(txt, to_upper=True, only_accents=False):
    """ Normalizes text, removing accents and punctuation
        :param txt: text to normalize
        :param to_upper: if True, returns text in uppercase
        :param only_accents: if True, only remove accents
        :type txt: str
        :type to_upper: bool
        :type only_accents: bool
        :return: returns normalized text
        :rtype: str
    """
    if is_nan(txt):
        return u''
    fmt_txt = normalize('NFKD', unicode(txt)).encode('ascii', 'ignore').strip()
    if to_upper:
        fmt_txt = fmt_txt.upper()
    if not only_accents:
        fmt_txt = regex.sub(ur'[^A-Za-z0-9 ]', u' ', fmt_txt)
        fmt_txt = regex.sub(ur'\s+', u' ', fmt_txt)
    return fmt_txt


def is_nan(value):
    """ Checks if a value is null
        :rtype: bool
    """
    return value != value


def get_hashed_text(text):
    """ Uses md5 to hash string
        :param text: text to be hashed
        :type text: str
        :return: returns hashed text
        :rtype: str
    """
    m = hashlib.md5()
    m.update(utils.norm_txt(text))
    hash_txt = m.hexdigest()
    return hash_txt
