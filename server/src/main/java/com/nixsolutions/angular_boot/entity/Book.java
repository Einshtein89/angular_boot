package com.nixsolutions.angular_boot.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.nixsolutions.angular_boot.entity.users.Photo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RequiredArgsConstructor
@ToString
@Getter
@Setter
@Document(collection = "books")
public class Book implements Serializable
{
  @Transient
  public static final String SEQUENCE_NAME = "books_sequence";

  @Id
  private long id;
  @NonNull
  private String author;
  @NonNull
  private String title;
  @NonNull
  private Double price;
//  @OneToOne(cascade = CascadeType.ALL)
//  @JoinTable(name = "book_photo", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "photo_id"))
//  private Photo photo;
//  @ManyToOne(cascade = CascadeType.ALL)
//  @JoinTable(name = "book_catalog", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
  @NonNull
  @DBRef
  private Catalog catalog;
  
//  public Photo getPhoto()
//  {
//    return photo;
//  }
//
//  public void setPhoto(Photo photo)
//  {
//    this.photo = photo;
//  }
//
//  public Catalog getCatalog()
//  {
//    return catalog;
//  }
//
//  public void setCatalog(Catalog catalog)
//  {
//    this.catalog = catalog;
//  }
}
