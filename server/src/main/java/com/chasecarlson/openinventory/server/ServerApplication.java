package com.chasecarlson.openinventory.server;

import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.annotation.PreDestroy;
import javax.sql.DataSource;

@SpringBootApplication
public class ServerApplication {
	public static org.slf4j.Logger logger = LoggerFactory.getLogger("openinventory");

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
