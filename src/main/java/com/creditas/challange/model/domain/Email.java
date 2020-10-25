package com.creditas.challange.model.domain;

public class Email {

	private String subject;
	private String to;
	private String from;
	private String body;
	private EmailStatus status;
	
	private Email() {
	}

	public static class EmailBuilder {
		private Email email = new Email();

		public EmailBuilder subject(String subject) {
			email.subject = subject;
			return this;
		}

		public EmailBuilder to(String to) {
			email.to = to;
			return this;
		}

		public EmailBuilder from(String from ) {
			email.from = from;
			return this;
		}

		public EmailBuilder body(String body) {
			email.body = body;
			return this;
		}

		public Email build() {
			email.status = EmailStatus.CREATED;
			return email;
		}
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public EmailStatus getStatus() {
		return status;
	}

	public void setStatus(EmailStatus status) {
		this.status = status;
	}

}
