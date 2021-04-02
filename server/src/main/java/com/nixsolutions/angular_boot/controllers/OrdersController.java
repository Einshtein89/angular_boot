package com.nixsolutions.angular_boot.controllers;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.ok;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nixsolutions.angular_boot.entity.Book;
import com.nixsolutions.angular_boot.process.order.OrderProcess;

@RestController
@RequestMapping("/api/orders")
public class OrdersController
{
  @Autowired
  private OrderProcess orderProcess;
  
  
  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> getOrders(@RequestParam("userId") Long userId)
  {
    if (userId <= 0)
    {
      return badRequest().build();
    }
    return ok(orderProcess.getOrders(userId));
  }
  
  @PostMapping
  public ResponseEntity<?> placeOrder(@RequestBody Map<String, Book> orderMap)
  {
    return orderProcess.placeOrders(orderMap);
  }
}
