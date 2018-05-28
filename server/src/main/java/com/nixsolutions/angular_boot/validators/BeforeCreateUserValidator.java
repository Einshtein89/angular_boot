package com.nixsolutions.angular_boot.validators;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.nixsolutions.angular_boot.dao.UserRepository;
import com.nixsolutions.angular_boot.entity.User;

@Component("beforeCreateUserValidator")
public class BeforeCreateUserValidator implements Validator
{
  @Autowired
  private UserRepository repository;

  @Override
  public boolean supports(Class<?> clazz) {
    return User.class.equals(clazz);
  }

  @Override
  public void validate(Object obj, Errors errors) {
    User newUser = (User) obj;
    User oldUserByNames =
        repository.findByFirstNameAndLastName(newUser.getFirstName(), newUser.getLastName());
    User oldUserByEmail =
        repository.findByEmail(newUser.getEmail());
    if (Objects.nonNull(oldUserByNames))
    {
      errors.rejectValue("firstName", "user.exist");
      errors.rejectValue("lastName", "user.exist");
    }
    if (Objects.nonNull(oldUserByEmail))
    {
      errors.rejectValue("email", "user.exist");
    }
  }
}

