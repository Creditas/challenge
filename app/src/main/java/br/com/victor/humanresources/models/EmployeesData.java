package br.com.victor.humanresources.models;

import java.util.List;

public class EmployeesData {
    private boolean loading;
    private Throwable throwable;
    private List<Employee> employees;

    public EmployeesData(boolean loading, Throwable exception, List<Employee> employees) {
        this.loading = loading;
        this.throwable = exception;
        this.employees = employees;
    }

    public boolean isLoading() {
        return loading;
    }

    public Throwable getThrowable() {
        return throwable;
    }

    public List<Employee> getEmployees() {
        return employees;
    }
}
