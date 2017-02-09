package br.com.victor.humanresources.presenter;

import br.com.victor.humanresources.interactor.Interactor;
import br.com.victor.humanresources.models.EmployeesData;
import br.com.victor.humanresources.view.EmployeesView;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

public class EmployeesPresenter {
    private EmployeesView view;

    public void attachView(EmployeesView view) {
        this.view = view;
    }

    public void dettachView() {
        this.view = null;
    }

    public void loadEmployees() {
        if (view != null) {
            view.renderResult(new EmployeesData(true, null, null));

            Interactor.getEmployers(90)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(apiResult -> view.renderResult(new EmployeesData(false, null, apiResult.getEmployees())),
                            error -> view.renderResult(new EmployeesData(false, error, null)));
        }
    }
}
