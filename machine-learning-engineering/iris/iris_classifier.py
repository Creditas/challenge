import numpy as np
import pandas as pd

from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


def get_label(x):
    if x == 0:
        return 'setosa'
    elif x == 1:
        return 'versicolor'
    else:
        return 'virginica'


iris = load_iris()
X = iris.data
y = iris.target

pd_iris = pd.DataFrame(data=np.c_[iris['data'], iris['target']], columns=iris['feature_names'] + ['target'])

pd_iris['target'] = pd_iris['target'].apply(get_label)

# split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42, test_size=0.5)

# build the model
clf = RandomForestClassifier(n_estimators=10)

# train the classifier
clf.fit(X_train, y_train)


def classify_iris(features: dict):
    raw_features = [features['sepal_l'], features['sepal_w'], features['petal_l'], features['petal_w']]
    prediction = clf.predict_proba([raw_features])
    return {'class': get_label([np.argmax(prediction)]), 'probability': round(max(prediction[0]), 2)}
