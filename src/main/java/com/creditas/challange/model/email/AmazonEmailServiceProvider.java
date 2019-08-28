package com.creditas.challange.model.email;

import com.creditas.challange.model.domain.Email;
import com.creditas.challange.model.domain.EmailStatus;

public class AmazonEmailServiceProvider implements EmailServiceProvider {
	
	private static final AmazonEmailServiceProvider INSTANCE = new AmazonEmailServiceProvider();

	private AmazonEmailServiceProvider() {
	}

	public static AmazonEmailServiceProvider getInstance() {
		return INSTANCE;
	}

	public EmailStatus send(Email email) {
		return EmailStatus.SENT;
	}
}
