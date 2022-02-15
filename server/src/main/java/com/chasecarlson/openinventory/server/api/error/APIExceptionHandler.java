package com.chasecarlson.openinventory.server.api.error;

import com.chasecarlson.openinventory.server.api.error.ItemNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class APIExceptionHandler {
	@ExceptionHandler(ItemNotFoundException.class)
	public ResponseEntity<APIErrorResponse> handleException(ItemNotFoundException e) {
		return new ResponseEntity<>(new APIErrorResponse("No item found with ID " + e.getId()), HttpStatus.NOT_FOUND);
	}
}
