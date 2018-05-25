package com.nixsolutions.angular_boot.dao;


import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.nixsolutions.angular_boot.entity.User;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long>
{
  User findByFirstNameAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName);
  User findByEmail(@Param("email") String email);
}
