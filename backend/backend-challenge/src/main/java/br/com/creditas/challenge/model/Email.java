package br.com.creditas.challenge.model;

import br.com.creditas.challenge.model.enums.EmailStatus;

public class Email {
	
	private String subject;
	private String to;
	private String from;
	private String body;
	private EmailStatus status;
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
