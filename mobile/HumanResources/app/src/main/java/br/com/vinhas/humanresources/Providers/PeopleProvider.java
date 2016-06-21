package br.com.vinhas.humanresources.Providers;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONObject;

import cz.msebera.android.httpclient.Header;

/**
 * Created by Vinhas on 6/20/2016.
 */
public class PeopleProvider {
    public void getPeople(final JsonHttpResponseHandler responseHandler)
    {
        String url = "http://api.randomuser.me/?results=90";
        AsyncHttpClient client = new AsyncHttpClient();
        client.get(url, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                responseHandler.onSuccess(statusCode, headers, response);
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
                responseHandler.onFailure(statusCode, headers, responseString, throwable);
            }
        });
    }
}
