package com.creditas.challange.model.domain;

public class User {

	private String name;
	private String email;
	private String username;
	private String password;

	private User() {
	}

	public static class UserBuilder {
		private User user = new User();

		public UserBuilder name(String name) {
			user.name = name;
			return this;
		}

		public UserBuilder username(String username) {
			user.username = username;
			return this;
		}

		public UserBuilder passwor(String password) {
			user.password = password;
			return this;
		}

		public UserBuilder email(String email) {
			user.email = email;
			return this;
		}

		public User build() {
			return user;
		}
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

}
