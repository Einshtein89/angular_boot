package com.nixsolutions.angular_boot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackboneBootApplication {

	private static final Logger log = LoggerFactory.getLogger(BackboneBootApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BackboneBootApplication.class, args);
	}

}
