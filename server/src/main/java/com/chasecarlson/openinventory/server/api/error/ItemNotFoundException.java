package com.chasecarlson.openinventory.server.api.error;


public class ItemNotFoundException extends RuntimeException {
	private long id;

	public ItemNotFoundException(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}
}
