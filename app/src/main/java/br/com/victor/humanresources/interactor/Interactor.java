package br.com.victor.humanresources.interactor;

import br.com.victor.humanresources.models.ApiResult;
import io.reactivex.Observable;

public class Interactor {
    public static Observable<ApiResult> getEmployers(int qtd) {
        return ServiceFactory.getService().getEmployers("", qtd);
    }
}
