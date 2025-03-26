package com.zerothon.zerothon_ddt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "common.entity")
public class ZerothonDdtApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZerothonDdtApplication.class, args);
	}

}
