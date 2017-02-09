package br.com.victor.humanresources.view;

import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ProgressBar;

import com.google.gson.Gson;

import br.com.victor.humanresources.R;
import br.com.victor.humanresources.models.EmployeesData;
import br.com.victor.humanresources.presenter.EmployeesPresenter;
import butterknife.BindView;
import butterknife.ButterKnife;

public class MainActivity extends AppCompatActivity implements EmployeesView {

    static final String DATA_STATE = "data";

    @BindView(R.id.recycler_list)
    RecyclerView recyclerView;

    @BindView(R.id.progress)
    ProgressBar progressBar;

    Snackbar snackbar;

    EmployeesPresenter presenter;
    EmployeesData data;
    EmployeesAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        presenter = new EmployeesPresenter();
        presenter.attachView(this);

        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new GridLayoutManager(this, 2));

        if (savedInstanceState != null) {
            this.data = new Gson().fromJson(savedInstanceState.getString(DATA_STATE), EmployeesData.class);
        }

        if (data != null)
            renderResult(data);
        else
            presenter.loadEmployees();
    }

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        super.onSaveInstanceState(savedInstanceState);
        savedInstanceState.putString(DATA_STATE, new Gson().toJson(data));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        presenter.dettachView();
    }

    @Override
    public void renderResult(EmployeesData data) {
        this.data = data;

        progressBar.setVisibility(data.isLoading() ? View.VISIBLE : View.GONE);

        if (data.getThrowable() != null) {
            snackbar = Snackbar
                    .make(recyclerView,
                            R.string.employess_list_get_error,
                            Snackbar.LENGTH_INDEFINITE)
                    .setAction(R.string.retry,
                            view -> presenter.loadEmployees());

            snackbar.show();
        }

        if (data.getEmployees() != null) {
            if (snackbar != null && snackbar.isShown())
                snackbar.dismiss();

            if (adapter == null) {
                adapter = new EmployeesAdapter(this, data.getEmployees());
                recyclerView.setAdapter(adapter);
            } else {
                adapter.notifyDataSetChanged();
            }
        }
    }

}
