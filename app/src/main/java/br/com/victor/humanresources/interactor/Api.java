package br.com.victor.humanresources.interactor;

import br.com.victor.humanresources.models.ApiResult;
import io.reactivex.Observable;
import retrofit2.http.GET;
import retrofit2.http.Query;
import retrofit2.http.Url;

public interface Api {

    @GET
    Observable<ApiResult> getEmployers(@Url String nothing, @Query("results") int qtd);
}
