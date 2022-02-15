package com.chasecarlson.openinventory.server.api.error;

public class APIErrorResponse {
	private final String message;

	public APIErrorResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	@Override
	public String toString() {
		return this.getMessage();
	}
}
