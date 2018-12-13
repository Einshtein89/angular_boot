package com.nixsolutions.angular_boot.dao.impl;

import static com.nixsolutions.angular_boot.configs.Constants.PASSWORD_MAX_LENGTH;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.nixsolutions.angular_boot.dao.RoleRepository;
import com.nixsolutions.angular_boot.dao.UserRepository;
import com.nixsolutions.angular_boot.entity.Role;
import com.nixsolutions.angular_boot.entity.User;

import io.jsonwebtoken.lang.Collections;

@Component
@Primary
public class DefaultUserRepositoryImpl implements UserRepository
{
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private BCryptPasswordEncoder passwordEncoder;
  
  @Override
  public List<User> findByFirstNameAndLastName(
      String firstName, String lastName)
  {
    return userRepository.findByFirstNameAndLastName(firstName, lastName);
  }
  
  @Override
  public List<User> findByFirstNameContainsOrLastNameContains(String firstName, String lastName)
  {
    return userRepository.findByFirstNameContainsOrLastNameContains(firstName, lastName);
  }
  
  @Override
  public User findByEmail(String email)
  {
    return userRepository.findByEmail(email);
  }
  
  @Override
  public <S extends User> S save(S s)
  {
    if (s.getPassword().length() <= PASSWORD_MAX_LENGTH)
    {
      String encodedPassword = passwordEncoder.encode(s.getPassword());
      s.setPassword(encodedPassword);
    }
    if (Collections.isEmpty(s.getRoles()))
    {
      HashSet<Role> roles = new HashSet<>();
      roles.add(roleRepository.findByRole("USER"));
      s.setRoles(roles);
    }
    return userRepository.save(s);
  }
  
  @Override
  public <S extends User> Iterable<S> save(Iterable<S> iterable)
  {
    return userRepository.save(iterable);
  }
  
  @Override
  public User findOne(Long aLong)
  {
    return userRepository.findOne(aLong);
  }
  
  @Override
  public boolean exists(Long aLong)
  {
    return userRepository.exists(aLong);
  }
  
  @Override
  public Iterable<User> findAll()
  {
    return userRepository.findAll();
  }
  
  @Override
  public Iterable<User> findAll(Iterable<Long> iterable)
  {
    return userRepository.findAll(iterable);
  }
  
  @Override
  public long count()
  {
    return userRepository.count();
  }
  
  @Override
  public void delete(Long aLong)
  {
  }
  
  @Override
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public void delete(User user)
  {
  
  }
  
  @Override
  public void delete(Iterable<? extends User> iterable)
  {
  
  }
  
  @Override
  public void deleteAll()
  {
  
  }
  
  @Override
  public Iterable<User> findAll(Sort sort)
  {
    return userRepository.findAll(sort);
  }
  
  @Override
  public Page<User> findAll(Pageable pageable)
  {
    return userRepository.findAll(pageable);
  }
}
