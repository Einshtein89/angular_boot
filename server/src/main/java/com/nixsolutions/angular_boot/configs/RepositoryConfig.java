package com.nixsolutions.angular_boot.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import com.nixsolutions.angular_boot.entity.Book;
import com.nixsolutions.angular_boot.entity.Catalog;
import com.nixsolutions.angular_boot.entity.Order;
import com.nixsolutions.angular_boot.entity.users.User;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(User.class, Catalog.class, Order.class, Book.class);
  }
}