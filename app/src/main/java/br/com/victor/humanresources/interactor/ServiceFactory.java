package br.com.victor.humanresources.interactor;

import com.jakewharton.retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;

import br.com.victor.humanresources.BuildConfig;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ServiceFactory {
    private static Api service;

    public static Api getService() {
        if (service == null) {
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(BuildConfig.URLBASE)
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
            service = retrofit.create(Api.class);
        }

        return service;
    }
}
