package com.creditas.challange.model.email;

import com.creditas.challange.model.domain.Email;
import com.creditas.challange.model.domain.EmailStatus;

public class GmailEmailServiceProvider implements EmailServiceProvider {

	private static final GmailEmailServiceProvider INSTANCE = new GmailEmailServiceProvider();

	private GmailEmailServiceProvider() {
	}

	public static GmailEmailServiceProvider getInstance() {
		return INSTANCE;
	}

	public EmailStatus send(Email email) {
		return EmailStatus.SENT;
	}

}
