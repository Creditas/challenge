package br.com.vinhas.humanresources.Models;

/**
 * Created by Vinhas on 6/21/2016.
 */
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PeopleModel implements Serializable {

    @SerializedName("results")
    @Expose
    private List<Result> results = new ArrayList<Result>();
    @SerializedName("info")
    @Expose
    private Info info;

    /**
     *
     * @return
     *     The results
     */
    public List<Result> getResults() {
        return results;
    }

    /**
     *
     * @param results
     *     The results
     */
    public void setResults(List<Result> results) {
        this.results = results;
    }

    /**
     *
     * @return
     *     The info
     */
    public Info getInfo() {
        return info;
    }

    /**
     *
     * @param info
     *     The info
     */
    public void setInfo(Info info) {
        this.info = info;
    }

    public class Result {

        @SerializedName("gender")
        @Expose
        private String gender;
        @SerializedName("name")
        @Expose
        private Name name;
        @SerializedName("location")
        @Expose
        private Location location;
        @SerializedName("email")
        @Expose
        private String email;
        @SerializedName("login")
        @Expose
        private Login login;
        @SerializedName("registered")
        @Expose
        private Integer registered;
        @SerializedName("dob")
        @Expose
        private Integer dob;
        @SerializedName("phone")
        @Expose
        private String phone;
        @SerializedName("cell")
        @Expose
        private String cell;
        @SerializedName("id")
        @Expose
        private Id id;
        @SerializedName("picture")
        @Expose
        private Picture picture;
        @SerializedName("nat")
        @Expose
        private String nat;

        /**
         *
         * @return
         *     The gender
         */
        public String getGender() {
            return gender;
        }

        /**
         *
         * @param gender
         *     The gender
         */
        public void setGender(String gender) {
            this.gender = gender;
        }

        /**
         *
         * @return
         *     The name
         */
        public Name getName() {
            return name;
        }

        /**
         *
         * @param name
         *     The name
         */
        public void setName(Name name) {
            this.name = name;
        }

        /**
         *
         * @return
         *     The location
         */
        public Location getLocation() {
            return location;
        }

        /**
         *
         * @param location
         *     The location
         */
        public void setLocation(Location location) {
            this.location = location;
        }

        /**
         *
         * @return
         *     The email
         */
        public String getEmail() {
            return email;
        }

        /**
         *
         * @param email
         *     The email
         */
        public void setEmail(String email) {
            this.email = email;
        }

        /**
         *
         * @return
         *     The login
         */
        public Login getLogin() {
            return login;
        }

        /**
         *
         * @param login
         *     The login
         */
        public void setLogin(Login login) {
            this.login = login;
        }

        /**
         *
         * @return
         *     The registered
         */
        public Integer getRegistered() {
            return registered;
        }

        /**
         *
         * @param registered
         *     The registered
         */
        public void setRegistered(Integer registered) {
            this.registered = registered;
        }

        /**
         *
         * @return
         *     The dob
         */
        public Integer getDob() {
            return dob;
        }

        /**
         *
         * @param dob
         *     The dob
         */
        public void setDob(Integer dob) {
            this.dob = dob;
        }

        /**
         *
         * @return
         *     The phone
         */
        public String getPhone() {
            return phone;
        }

        /**
         *
         * @param phone
         *     The phone
         */
        public void setPhone(String phone) {
            this.phone = phone;
        }

        /**
         *
         * @return
         *     The cell
         */
        public String getCell() {
            return cell;
        }

        /**
         *
         * @param cell
         *     The cell
         */
        public void setCell(String cell) {
            this.cell = cell;
        }

        /**
         *
         * @return
         *     The id
         */
        public Id getId() {
            return id;
        }

        /**
         *
         * @param id
         *     The id
         */
        public void setId(Id id) {
            this.id = id;
        }

        /**
         *
         * @return
         *     The picture
         */
        public Picture getPicture() {
            return picture;
        }

        /**
         *
         * @param picture
         *     The picture
         */
        public void setPicture(Picture picture) {
            this.picture = picture;
        }

        /**
         *
         * @return
         *     The nat
         */
        public String getNat() {
            return nat;
        }

        /**
         *
         * @param nat
         *     The nat
         */
        public void setNat(String nat) {
            this.nat = nat;
        }

    }

    public class Picture {

        @SerializedName("large")
        @Expose
        private String large;
        @SerializedName("medium")
        @Expose
        private String medium;
        @SerializedName("thumbnail")
        @Expose
        private String thumbnail;

        /**
         *
         * @return
         *     The large
         */
        public String getLarge() {
            return large;
        }

        /**
         *
         * @param large
         *     The large
         */
        public void setLarge(String large) {
            this.large = large;
        }

        /**
         *
         * @return
         *     The medium
         */
        public String getMedium() {
            return medium;
        }

        /**
         *
         * @param medium
         *     The medium
         */
        public void setMedium(String medium) {
            this.medium = medium;
        }

        /**
         *
         * @return
         *     The thumbnail
         */
        public String getThumbnail() {
            return thumbnail;
        }

        /**
         *
         * @param thumbnail
         *     The thumbnail
         */
        public void setThumbnail(String thumbnail) {
            this.thumbnail = thumbnail;
        }

    }

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

        /**
         *
         * @return
         *     The title
         */
        public String getTitle() {
            return title;
        }

        /**
         *
         * @param title
         *     The title
         */
        public void setTitle(String title) {
            this.title = title;
        }

        /**
         *
         * @return
         *     The first
         */
        public String getFirst() {
            return first;
        }

        /**
         *
         * @param first
         *     The first
         */
        public void setFirst(String first) {
            this.first = first;
        }

        /**
         *
         * @return
         *     The last
         */
        public String getLast() {
            return last;
        }

        /**
         *
         * @param last
         *     The last
         */
        public void setLast(String last) {
            this.last = last;
        }

    }

    public class Login {

        @SerializedName("username")
        @Expose
        private String username;
        @SerializedName("password")
        @Expose
        private String password;
        @SerializedName("salt")
        @Expose
        private String salt;
        @SerializedName("md5")
        @Expose
        private String md5;
        @SerializedName("sha1")
        @Expose
        private String sha1;
        @SerializedName("sha256")
        @Expose
        private String sha256;

        /**
         *
         * @return
         *     The username
         */
        public String getUsername() {
            return username;
        }

        /**
         *
         * @param username
         *     The username
         */
        public void setUsername(String username) {
            this.username = username;
        }

        /**
         *
         * @return
         *     The password
         */
        public String getPassword() {
            return password;
        }

        /**
         *
         * @param password
         *     The password
         */
        public void setPassword(String password) {
            this.password = password;
        }

        /**
         *
         * @return
         *     The salt
         */
        public String getSalt() {
            return salt;
        }

        /**
         *
         * @param salt
         *     The salt
         */
        public void setSalt(String salt) {
            this.salt = salt;
        }

        /**
         *
         * @return
         *     The md5
         */
        public String getMd5() {
            return md5;
        }

        /**
         *
         * @param md5
         *     The md5
         */
        public void setMd5(String md5) {
            this.md5 = md5;
        }

        /**
         *
         * @return
         *     The sha1
         */
        public String getSha1() {
            return sha1;
        }

        /**
         *
         * @param sha1
         *     The sha1
         */
        public void setSha1(String sha1) {
            this.sha1 = sha1;
        }

        /**
         *
         * @return
         *     The sha256
         */
        public String getSha256() {
            return sha256;
        }

        /**
         *
         * @param sha256
         *     The sha256
         */
        public void setSha256(String sha256) {
            this.sha256 = sha256;
        }

    }

    public class Location {

        @SerializedName("street")
        @Expose
        private String street;
        @SerializedName("city")
        @Expose
        private String city;
        @SerializedName("state")
        @Expose
        private String state;
        @SerializedName("postcode")
        @Expose
        private String postcode;

        /**
         *
         * @return
         *     The street
         */
        public String getStreet() {
            return street;
        }

        /**
         *
         * @param street
         *     The street
         */
        public void setStreet(String street) {
            this.street = street;
        }

        /**
         *
         * @return
         *     The city
         */
        public String getCity() {
            return city;
        }

        /**
         *
         * @param city
         *     The city
         */
        public void setCity(String city) {
            this.city = city;
        }

        /**
         *
         * @return
         *     The state
         */
        public String getState() {
            return state;
        }

        /**
         *
         * @param state
         *     The state
         */
        public void setState(String state) {
            this.state = state;
        }

        /**
         *
         * @return
         *     The postcode
         */
        public String getPostcode() {
            return postcode;
        }

        /**
         *
         * @param postcode
         *     The postcode
         */
        public void setPostcode(String postcode) {
            this.postcode = postcode;
        }

    }

    public class Info {

        @SerializedName("seed")
        @Expose
        private String seed;
        @SerializedName("results")
        @Expose
        private Integer results;
        @SerializedName("page")
        @Expose
        private Integer page;
        @SerializedName("version")
        @Expose
        private String version;

        /**
         *
         * @return
         *     The seed
         */
        public String getSeed() {
            return seed;
        }

        /**
         *
         * @param seed
         *     The seed
         */
        public void setSeed(String seed) {
            this.seed = seed;
        }

        /**
         *
         * @return
         *     The results
         */
        public Integer getResults() {
            return results;
        }

        /**
         *
         * @param results
         *     The results
         */
        public void setResults(Integer results) {
            this.results = results;
        }

        /**
         *
         * @return
         *     The page
         */
        public Integer getPage() {
            return page;
        }

        /**
         *
         * @param page
         *     The page
         */
        public void setPage(Integer page) {
            this.page = page;
        }

        /**
         *
         * @return
         *     The version
         */
        public String getVersion() {
            return version;
        }

        /**
         *
         * @param version
         *     The version
         */
        public void setVersion(String version) {
            this.version = version;
        }

    }

    public class Id {

        @SerializedName("name")
        @Expose
        private String name;
        @SerializedName("value")
        @Expose
        private String value;

        /**
         *
         * @return
         *     The name
         */
        public String getName() {
            return name;
        }

        /**
         *
         * @param name
         *     The name
         */
        public void setName(String name) {
            this.name = name;
        }

        /**
         *
         * @return
         *     The value
         */
        public String getValue() {
            return value;
        }

        /**
         *
         * @param value
         *     The value
         */
        public void setValue(String value) {
            this.value = value;
        }

    }


}

