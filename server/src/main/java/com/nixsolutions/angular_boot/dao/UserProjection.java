package com.nixsolutions.angular_boot.dao;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import com.nixsolutions.angular_boot.entity.Role;
import com.nixsolutions.angular_boot.entity.User;

@Projection(name = "userFields", types = { User.class })
interface UserProjection
{
  String getFirstName();
  String getLastName();
  String getPhone();
  String getSex();
  String getEmail();
  Set<Role> getRoles();
}
