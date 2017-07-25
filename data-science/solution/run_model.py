# coding: utf-8
import click
import logging
import os
import pandas as pd
import pickle
from sklearn.svm import LinearSVC
from sklearn.feature_selection import SelectFromModel, SelectKBest
from sklearn.grid_search import GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, make_scorer
from sklearn.cross_validation import StratifiedShuffleSplit, train_test_split

import utils
from clean_df import process_df

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def optimize_hyperparams(X_train, y_train, params, kfolds):
    """ Optimize hyperparameters performing a cv gridsearch
        on `params`
        Returns the best classifier found
    """
    feature_selection_model = SelectKBest()

    classifiers = [
        ('log_reg', LogisticRegression(class_weight='balanced')),
        ('decision_tree', DecisionTreeClassifier(class_weight='balanced')),
        ('random_forest', RandomForestClassifier(class_weight='balanced'))
    ]

    best_classifier_data = {}
    best_model_score = 0.
    for clf_model in classifiers:
        model_name = clf_model[0]
        logging.info(u'Optimizing model {}'.format(model_name))

        text_to_hash = utils.norm_txt(params)
        hash_txt = utils.get_hashed_text(text_to_hash)
        filename = 'data/clf_model_{model_name}_{hash_txt}.bin'.format(
            model_name=model_name,
            hash_txt=hash_txt
        )
        if os.path.exists(filename):
            best_clf = pickle.load(open(filename, 'rb'))
        else:
            steps = [
                ('feature_selection', feature_selection_model),
                clf_model
            ]
            pipe = Pipeline(steps)
            params_model = {k: v for k, v in params.items() \
                            if model_name in k or 'feature_' in k}

            logger.info(u'Performing the grid search...')
            best_clf = GridSearchCV(
                pipe,
                param_grid=params_model,
                cv=kfolds,
                scoring=u'roc_auc',
                verbose=3
            )

            best_clf.fit(X_train, y_train)
            best_clf_score = best_clf.best_score_

            if best_clf_score > best_model_score:
                best_classifier_data['clf'] = model_name
                best_classifier_data['params'] = best_clf.best_params_
                best_classifier_data['score'] = best_clf_score
                best_model_score = best_clf_score

            logger.info(u'Saving the model...')
            pickle.dump(best_clf, open(filename, 'wb'))

    #print best_clf.best_params_
    print best_classifier_data
    logger.info(u'Finished optimization.')

    return best_clf


def test_classifier(clf, test_file, dict_label_encoder, standard_scaler,
                    remove_cols):
    """ Tests the classifier using a `test_file`
        Saves a csv with the probabilities for label = 1
    """
    df = pd.read_csv(test_file, encoding='utf-8')
    remove_cols += [u'sent_to_analysis']
    df = df.drop_duplicates(subset=u'id')
    ids = df[u'id'].values
    # process in the same way as training dataset
    df, _, _ = process_df(
        df,
        remove_cols=remove_cols,
        dict_label_encoder=dict_label_encoder,
        standard_scaler=standard_scaler
    )
    X = df.as_matrix()
    # predict probabilities
    probs = clf.predict_proba(X)
    prob_1 = probs.transpose()[1]
    # put the results into a dataframe and save csv file
    res = pd.DataFrame()
    res[u'ids'] = ids
    res[u'predictions'] = prob_1
    res.to_csv(
        u'data/predictions.csv',
        index=False,
        encoding='utf-8'
    )
    logger.info(u'Output saved in data/predictions.csv')


@click.command()
@click.option(u'--train_file', help=u'training file path',
              default=u'../dataset.csv')
@click.option(u'--target_col', help=u'column to predict',
              default=u'sent_to_analysis')
@click.option(u'--test_file', help=u'test file path',
              default=None)
def run_model(train_file, target_col, test_file):
    """ Runs the training model
        :param train_file: csv for training
        :param target_col: column to predict
        :param test_file: csv for testing
        :type train_file: csv for training
        :type target_col: column to predict
        :type test_file: csv for testing
    """
    logger.info(u'Opening training dataset...')
    df = pd.read_csv(train_file, encoding='utf-8')
    logger.info(u'Cleaning and preprocessing data...')
    # drops non classified rows and set `target_col` as index
    df = df[df[target_col].notnull()]
    df[target_col] = df[target_col].apply(int)
    df.set_index(target_col, inplace=True, drop=True)
    # clean and process data
    remove_cols = [u'landing_page',
        u'informed_purpose'
        u'auto_brand', u'auto_year', u'auto_model',
        u'zip_code', u'informed_purpose',
        u'Unnamed: 0', u'educational_level'
    ]
    df, dict_label_encoder, standard_scaler = process_df(
        df,
        remove_cols=remove_cols
    )

    # select the best model for the given parameters
    target = df.index.values
    data = df.reset_index(drop=True).as_matrix()
    # set params
    kfolds = 5
    params = {
        'feature_selection__k': (15, 20, 'all'),
        'log_reg__C': (0.2, 0.1, 0.01, 0.001),
        'log_reg__penalty': ('l1', 'l2'),
        'decision_tree__max_depth': (3, 5, 10, None),
        'random_forest__max_depth': (3, 5, 10, None),
        'random_forest__max_features': (u'auto', u'sqrt', None)
    }

    # train the model and optimize hyperparams
    logger.info(u'Training the model...')
    clf = optimize_hyperparams(data, target, params, kfolds)

    if test_file:
        # test classifier and generates csv with predictions (probabilities)
        logger.info(u'Classifying the test file...')
        test_classifier(clf, test_file, dict_label_encoder, standard_scaler,
                        remove_cols)

if __name__ == '__main__':
    run_model()
