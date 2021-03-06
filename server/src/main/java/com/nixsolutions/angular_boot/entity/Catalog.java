package com.nixsolutions.angular_boot.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "catalog")
@DynamicUpdate
public class Catalog implements Serializable
{
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "category_id")
  private long id;
  @Column(name = "category_name")
  private String name;
  
  public long getId()
  {
    return id;
  }
  
  public void setId(long id)
  {
    this.id = id;
  }
  
  public String getName()
  {
    return name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
}
