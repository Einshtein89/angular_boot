package com.nixsolutions.angular_boot.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.nixsolutions.angular_boot.entity.Order;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
//@RepositoryRestResource(collectionResourceRel = "orders", path = "orders")
public interface OrderRepository extends CrudRepository<Order, Long>
{
//  @Query("SELECT order FROM Order order WHERE order.userId = :userId order by order.uniqueId")
  List<Order> getAllByUserIdOrderByUniqueId (@Param("userId") long userId);
}
