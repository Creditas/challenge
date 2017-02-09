
package br.com.victor.humanresources.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Name {

    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("first")
    @Expose
    private String first;
    @SerializedName("last")
    @Expose
    private String last;

    public String getTitle() {
        return title;
    }

    public String getFirst() {
        return first;
    }

    public String getLast() {
        return last;
    }

    public String getCompleteName() {
        return first + " " + last;
    }

}
