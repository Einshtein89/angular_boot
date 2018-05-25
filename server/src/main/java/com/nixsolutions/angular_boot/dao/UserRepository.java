package com.nixsolutions.angular_boot.dao;


import com.nixsolutions.angular_boot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

  User findByFirstNameAndLastName(String firstName, String lastName);
  User findByEmail(String email);
}
