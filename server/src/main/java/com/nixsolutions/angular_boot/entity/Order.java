package com.nixsolutions.angular_boot.entity;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import com.nixsolutions.angular_boot.entity.users.User;

@Entity
@Table(name = "orders")
@DynamicUpdate
public class Order implements Serializable
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private long id;
  @Column(name = "unique_id")
  private long uniqueId;
  @Column(name = "book_id")
  private long bookId;
  @Column(name = "user_id")
  private long userId;
  private long amount;
  private Date date;
  
  public Order(Order order)
  {
    this.id = order.id;
    this.uniqueId = order.uniqueId;
    this.bookId = order.bookId;
    this.userId = order.userId;
    this.amount = order.amount;
    this.date = order.date;
  }
  
  public Order() {}
  
  public long getId()
  {
    return id;
  }
  
  public void setId(long id)
  {
    this.id = id;
  }
  
  public long getBookId()
  {
    return bookId;
  }
  
  public void setBookId(long bookId)
  {
    this.bookId = bookId;
  }
  
  public long getUserId()
  {
    return userId;
  }
  
  public void setUserId(long userId)
  {
    this.userId = userId;
  }
  
  public long getAmount()
  {
    return amount;
  }
  
  public void setAmount(long amount)
  {
    this.amount = amount;
  }
  
  
  public Date getDate()
  {
    return date;
  }
  
  public void setDate(Date date)
  {
    this.date = date;
  }
  
  public long getUniqueId()
  {
    return uniqueId;
  }
  
  public void setUniqueId(long uniqueId)
  {
    this.uniqueId = uniqueId;
  }
}
