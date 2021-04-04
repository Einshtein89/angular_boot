package com.nixsolutions.angular_boot.process.order;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.EMPTY;
import static org.springframework.http.ResponseEntity.ok;

import java.time.LocalDate;
import java.util.Date;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;

import com.nixsolutions.angular_boot.dao.BookRepository;
import com.nixsolutions.angular_boot.dao.OrderRepository;
import com.nixsolutions.angular_boot.dao.UserRepository;
import com.nixsolutions.angular_boot.entity.Book;
import com.nixsolutions.angular_boot.entity.Order;
import com.nixsolutions.angular_boot.entity.OrderExtension;

@Service
public class OrderProcess
{
  private static final String ORDERS = "orders";
  @Autowired
  private OrderRepository orderRepository;
  
  @Autowired
  private UserRepository userRepository;
  
  @Autowired
  private BookRepository bookRepository;
  
  public String getOrders(Long userId)
  {
    List<Order> ordersByUser = orderRepository.getAllByUserIdOrderById(userId);
    Map<LocalDate, Map<Long, List<OrderExtension>>> processedOrders = ordersByUser.stream()
        .map(this::toOrderExtension)
        .collect(groupingBy(Order::getDate, groupingBy(Order::getUniqueId)));
    JSONObject response = new JSONObject();
    response.put(ORDERS, processedOrders);
    if (!CollectionUtils.isEmpty(processedOrders))
    {
      return response.toString();
    }
    return EMPTY;
  }
  
  public ResponseEntity<?> placeOrders(Map<String, Book> orderMap)
  {
    HashMap<Book, Long> preparedMap = preProcess(orderMap);
    long uniqueId = Calendar.getInstance().getTimeInMillis();
    List<Order> orders = preparedMap.entrySet().stream()
        .map(toOrder(uniqueId))
        .collect(toList());
    if (!CollectionUtils.isEmpty(orders))
    {
      orderRepository.save(orders);
      return ok(uniqueId);
    }
    return ResponseEntity.badRequest().build();
  }
  
  private OrderExtension toOrderExtension(Order order)
  {
    OrderExtension orderExtension = new OrderExtension(order);
    Book book = Optional.ofNullable(bookRepository.findOne(order.getBookId()))
        .orElseThrow(() -> new RuntimeException("cannot find book with id: " + order.getBookId()));
    orderExtension.setBook(book);
    return orderExtension;
  }
  
  private HashMap<Book, Long> preProcess(Map<String, Book> orderMap)
  {
    HashMap<Book, Long> map = new HashMap<>();
    orderMap.forEach((key, value) -> map.put(value, processKeys(key)));
    return map;
  }
  
  private Long processKeys(String key)
  {
    return Long.parseLong(key.substring(0 , key.indexOf("_")));
  }
  
  private Function<Map.Entry<Book, Long>, Order> toOrder(long uniqueId)
  {
    return entry -> {
      Order order = new Order();
      order.setBookId(entry.getKey().getId());
      order.setAmount(entry.getValue());
      User principal = (org.springframework.security.core.userdetails.User)
          SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      com.nixsolutions.angular_boot.entity.users.User currentUser = userRepository.findByEmail(principal.getUsername());
      order.setUserId(currentUser.getId());
      order.setDate(LocalDate.now());
      order.setUniqueId(uniqueId);
      return order;
    };
  }
}
