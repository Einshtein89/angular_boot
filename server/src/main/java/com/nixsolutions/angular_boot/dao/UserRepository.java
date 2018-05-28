package com.nixsolutions.angular_boot.dao;


import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.nixsolutions.angular_boot.entity.User;

@RepositoryRestResource(collectionResourceRel = "users", path = "users",
    excerptProjection = UserProjection.class)
@CrossOrigin(origins = "http://localhost:4200")
public interface UserRepository extends PagingAndSortingRepository<User, Long>
{
  User findByFirstNameAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName);
  User findByEmail(@Param("email") String email);
}
