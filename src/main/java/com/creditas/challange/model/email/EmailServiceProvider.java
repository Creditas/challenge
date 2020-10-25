package com.creditas.challange.model.email;

import com.creditas.challange.model.domain.Email;
import com.creditas.challange.model.domain.EmailStatus;

public interface EmailServiceProvider {
	
	EmailStatus send(Email email);

}
