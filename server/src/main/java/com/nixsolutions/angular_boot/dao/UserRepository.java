package com.nixsolutions.angular_boot.dao;


import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.nixsolutions.angular_boot.entity.User;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long>
{
  List<User> findByFirstNameAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName);
  List<User> findByFirstNameContainsOrLastNameContains(@Param("firstName") String firstName, @Param("lastName") String lastName);
  User findByEmail(@Param("email") String email);
  
}
