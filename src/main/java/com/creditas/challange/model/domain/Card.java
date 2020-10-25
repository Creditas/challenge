package com.creditas.challange.model.domain;

import java.util.Date;

public class Card {

	private String number;
	private Date expiresAt;
	private String code;
	
	private Card() {
	}
	
	public static class CardBuilder {
		private Card card = new Card();

		public CardBuilder number(String number) {
			card.number = number;
			return this;
		}

		public CardBuilder expiresAt(Date expiresAt) {
			card.expiresAt = expiresAt;
			return this;
		}

		public CardBuilder code(String code) {
			card.code = code;
			return this;
		}

		public Card build() {
			return card;
		}
	}

	public String getNumber() {
		return number;
	}

	public Date getExpiresAt() {
		return expiresAt;
	}

	public String getCode() {
		return code;
	}

}
