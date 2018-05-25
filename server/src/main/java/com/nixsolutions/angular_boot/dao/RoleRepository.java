package com.nixsolutions.angular_boot.dao;

import com.nixsolutions.angular_boot.entity.Role;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository("roleRepository")
public interface RoleRepository extends CrudRepository<Role, Integer> {
	Role findByRole(String role);

}
