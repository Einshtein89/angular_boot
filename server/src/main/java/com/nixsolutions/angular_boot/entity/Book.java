package com.nixsolutions.angular_boot.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import com.nixsolutions.angular_boot.entity.users.Photo;

@Entity
@Table(name = "book")
@DynamicUpdate
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "book_id")
  private long id;
  @Column(name = "author")
  private String author;
  @Column(name = "title")
  private String title;
  @Column(name = "price")
  private Double price;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinTable(name = "book_photo", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "photo_id"))
  private Photo photo;
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinTable(name = "book_catalog", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
  private Catalog catalog;
  
  public long getId()
  {
    return id;
  }
  
  public void setId(long id)
  {
    this.id = id;
  }
  
  public String getAuthor()
  {
    return author;
  }
  
  public void setAuthor(String author)
  {
    this.author = author;
  }
  
  public String getTitle()
  {
    return title;
  }
  
  public void setTitle(String title)
  {
    this.title = title;
  }
  
  public Photo getPhoto()
  {
    return photo;
  }
  
  public void setPhoto(Photo photo)
  {
    this.photo = photo;
  }
  
  public Catalog getCatalog()
  {
    return catalog;
  }
  
  public void setCatalog(Catalog catalog)
  {
    this.catalog = catalog;
  }
  
  public Double getPrice()
  {
    return price;
  }
  
  public void setPrice(Double price)
  {
    this.price = price;
  }
}
