package com.nixsolutions.angular_boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class AngularBootApplication
{
	public static void main(String[] args) {
		SpringApplication.run(AngularBootApplication.class, args);
	}
}
