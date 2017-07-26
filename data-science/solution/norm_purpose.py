# coding: utf-8
""" By analyzing the data from the column `informed_purpose`,
    it is possible to see that the main purposes of the loan
    can be divided into fixed categories
"""
import nltk

import utils

STEMMER = nltk.stem.SnowballStemmer(u'portuguese')

CATEGORIES = [u'DIVIDAS', u'INVESTIMENTO', u'VIAGEM',
              u'REFORMA', u'CASAMENTO', u'AQUISICOES',
              u'OUTROS']

CATEGORY_KEYWORDS = {
    u'DIVIDAS': [
        u'PAGAR', u'QUITAR', u'ZERAR', u'CONTAS', u'COBRIR',
        u'CHEQUE', u'DIVIDAS', u'PAGAMENTO', u'QUITACAO'
    ],
    u'INVESTIMENTO': [
        u'INVESTIMENTO', u'CAPITAL', u'EMPRESA', u'ENVESTIR',
        u'INVESTIR', u'VESTIR', u'GIRO'
    ],
    u'VIAGEM': [
        u'VIAGEM', u'VIAJAR', u'PASSEIO', u'PASSEAR'
    ],
    u'REFORMA': [
        u'REFORMAR', u'CONSTRUIR', u'CONSTRUCAO'
    ],
    u'CASAMENTO': [
        u'CASAMENTO', u'CASAR', u'NOIVO'
    ],
    u'AQUISICOES': [
        u'COMPRAR', u'TROCAR', u'ADQUIRIR'
    ]
}

# inverted dict from CATEGORY_KEYWORDS
KEYWORD_CATEGORY = {
    keyword: cat for cat, keywords in CATEGORY_KEYWORDS.items() \
        for keyword in keywords
}

stem_word = lambda word: STEMMER.stem(word)


def stem_words(words):
    """ Receives list of unique words and stem them
        :param words: list of words to be stemmed
        :type words: list(str)
        :return: returns dictionary with words and stemmed words
        :rtype: dict[str, str]
    """
    original2stemmed = {word: stem_word(word) for word in words}
    return original2stemmed


def norm_purposes(purposes):
    """ Normalizes purposes by normalizing text and doing stemming
        :params purposes: list of strings to be normalized
        :type purposes: list(str)
        :return: returns list of list of words for each purpose
        :rype: list(list(str))
    """
    purposes = [utils.norm_txt(purpose) for purpose in purposes]
    unique_purpose_words = list(set(u' '.join(purposes).split()))
    original2stemmed = stem_words(unique_purpose_words)
    stemmed_purpose_words = []
    for purpose in purposes:
        purpose_words = purpose.split()
        purpose_words = [original2stemmed[word] for word in purpose_words]
        stemmed_purpose_words.append(purpose_words)
    return stemmed_purpose_words


def find_purpose_categories(purposes):
    """ Receives list of purposes and find the categories to which they belong
        :param purposes: list of purposes
        :type purposes: list(str)
        :return: returns the categories
        :rtype: list(str)
    """
    list_purposes = norm_purposes(purposes)
    stemmed_keyword_category = {
        stem_word(key): cat for key, cat in KEYWORD_CATEGORY.items()
    }
    get_category = lambda w: stemmed_keyword_category.get(w, u'OUTROS')
    categories = []
    for purpose_words in list_purposes:
        found_categories = [get_category(w) for w in purpose_words]
        found_categories = list(set(found_categories))
        categories.append(u' '.join(found_categories))
    return categories
