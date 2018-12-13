package com.nixsolutions.angular_boot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name="photo")
@DynamicUpdate
public class Photo
{
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="photo_id")
  private long id;
  private String name;
  private byte[] body;
  
  public Photo() {}
  
  public Photo(String name, byte[] body)
  {
    this.name = name;
    this.body = body;
  }
  
  public long getId()
  {
    return this.id;
  }
  
  public void setId(long id)
  {
    this.id = id;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }
  
  public byte[] getBody()
  {
    return this.body;
  }
  
  public void setBody(byte[] body)
  {
    this.body = body;
  }
}
