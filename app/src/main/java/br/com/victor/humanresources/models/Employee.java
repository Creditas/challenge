
package br.com.victor.humanresources.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Employee {
    @SerializedName("name")
    @Expose
    private Name name;

    @SerializedName("picture")
    @Expose
    private Picture picture;

    public Name getName() {
        return name;
    }

    public Picture getPicture() {
        return picture;
    }
}
