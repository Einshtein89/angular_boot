package com.nixsolutions.angular_boot.controllers;

import static com.nixsolutions.angular_boot.configs.Constants.HEADER_STRING_AUTHORIZATION;
import static org.apache.commons.lang3.StringUtils.SPACE;

import java.io.IOException;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nixsolutions.angular_boot.configs.jwttoken.TokenProvider;
import com.nixsolutions.angular_boot.dao.UserRepository;
import com.nixsolutions.angular_boot.entity.PasswordChange;
import com.nixsolutions.angular_boot.entity.Photo;
import com.nixsolutions.angular_boot.entity.User;

@RestController
@RequestMapping("/changePassword")
public class ChangePasswordController
{
  @Autowired
  private TokenProvider tokenProvider;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  
  @PostMapping
  public ResponseEntity<?> saveUserPhoto(@RequestBody PasswordChange passwordChange)
  {
    long userId = passwordChange.getUserId();
    if (userId <= 0)
    {
      return new ResponseEntity<>("user.doesn't.exists.error", new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
    User currentUser = userRepository.findOne(userId);
    if (!bCryptPasswordEncoder.matches(passwordChange.getOldPassword(), currentUser.getPassword()))
    {
      return new ResponseEntity<>("old.password.doesn't.match.error", new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
    currentUser.setPassword(bCryptPasswordEncoder.encode(passwordChange.getNewPassword()));
    userRepository.save(currentUser);
    return ResponseEntity.ok(passwordChange);
  }
}
