
package br.com.victor.humanresources.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Picture {

    @SerializedName("large")
    @Expose
    private String large;

    public String getLarge() {
        return large;
    }
}
