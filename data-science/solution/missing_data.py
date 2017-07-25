# coding: utf-8
"""
    Modified from:
    https://stackoverflow.com/questions/35611465/python-scikit-learn-clustering-with-missing-data
"""
import numpy as np
from sklearn.cluster import KMeans

def k_means_missing(X, n_clusters, max_iter=10):
    """ Perform k-means clustering on data with missing values.
        Iterates until convergence or until `max_iter` is reached
        Returns array with missing values filled in
    """

    # Initialize missing values to their column means
    missing = ~np.isfinite(X)
    mu = np.nanmean(X, 0, keepdims=1)
    X_hat = np.where(missing, mu, X)

    # do multiple random initializations in parallel
    cls = KMeans(n_clusters, n_jobs=-1)
    # initialize empty prev_labels
    prev_labels = np.empty(len(X))
    for i in xrange(max_iter):
        # perform clustering on the filled-in data
        labels = cls.fit_predict(X_hat)
        centroids = cls.cluster_centers_

        # fill in the missing values based on their cluster centroids
        X_hat[missing] = centroids[labels][missing]

        # when the labels have stopped changing then we have converged
        if np.all(labels == prev_labels):
            break

        # update variable prev_labels to store current labels for the next
        # iteration
        prev_labels = labels

        # initialize KMeans with the current set of centroids for the next
        # iteration. 
        # this is much faster and makes it easier to check convergence 
        # (since labels won't be permuted on every iteration), but might be 
        # more prone to getting stuck in local minima (note from OP)
        cls = KMeans(n_clusters, init=centroids)

    return X_hat
