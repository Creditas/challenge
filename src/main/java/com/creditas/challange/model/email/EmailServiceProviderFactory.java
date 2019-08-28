package com.creditas.challange.model.email;

import java.util.HashMap;
import java.util.Map;

public class EmailServiceProviderFactory {

	private static Map<EmailProvider, EmailServiceProvider> providers = new HashMap<EmailProvider, EmailServiceProvider>();

	private EmailServiceProviderFactory() {
	}

	static {
		providers.put(EmailProvider.GMAIL, GmailEmailServiceProvider.getInstance());
		providers.put(EmailProvider.AMAZON, AmazonEmailServiceProvider.getInstance());
	}

	public static EmailServiceProvider get(EmailProvider type) {
		switch (type) {
		case AMAZON:
		case GMAIL:
			return providers.get(type);
		default:
			throw new RuntimeException("Email provider not supported!");
		}
	}

}
