package com.company.store.services;

public class LoginException extends RuntimeException {
    private static final long serialVersionUID = 1251678086434789825L;

	public LoginException() {
        super();
    }

    public LoginException(String message) {
        super(message);
    }
}
