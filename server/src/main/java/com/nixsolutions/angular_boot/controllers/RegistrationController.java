package com.nixsolutions.angular_boot.controllers;

import static com.nixsolutions.angular_boot.configs.Constants.REGISTRATION;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nixsolutions.angular_boot.dao.UserRepository;
import com.nixsolutions.angular_boot.entity.User;
import com.nixsolutions.angular_boot.validators.BeforeCreateUserValidator;

@RestController
@RequestMapping("/signup")
public class RegistrationController
{
  @Autowired
  private UserRepository userService;

  @Autowired
  private BeforeCreateUserValidator validator;

  @PostMapping
  public ResponseEntity<?> register(HttpServletRequest req, HttpServletResponse res, @RequestBody User user) {
    BeanPropertyBindingResult beanPropertyBindingResult =
        new BeanPropertyBindingResult(user, REGISTRATION);
    validator.validate(user, beanPropertyBindingResult);
    if (!beanPropertyBindingResult.hasErrors())
    {
      userService.save(user);
      return ResponseEntity.ok(user);
    }
    List<String> errors = beanPropertyBindingResult.getAllErrors().stream()
        .map(ObjectError::getCode)
        .collect(Collectors.toList());
    return new ResponseEntity<Object>(errors, new HttpHeaders(), HttpStatus.BAD_REQUEST);
  }
}
