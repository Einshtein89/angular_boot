package com.nixsolutions.angular_boot.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = { "email" }) })
@DynamicUpdate
public class User {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private long id;
  @Column(name = "email")
//	@Email(message = "{hibernate.user.email.message}")
//	@NotEmpty(message = "{hibernate.user.email.empty.message}")
  private String email;
  @Column(name = "password")
//	@Length(min = 5, message = "{hibernate.user.password.size.message}")
//	@NotEmpty(message = "{hibernate.user.password.empty.message}")
//	@JsonIgnore
  private String password;
  @Column(name = "first_name")
//	@NotEmpty(message = "{hibernate.user.firstName.empty.message}")
//	@Pattern(regexp = "^[a-zA-Z]+$", message = "{hibernate.user.firstName.invalid.format}")
  private String firstName;
  @Column(name = "last_name")
//	@NotEmpty(message = "{hibernate.user.lastName.empty.message}")
//	@Pattern(regexp = "^[a-zA-Z]+$", message = "{hibernate.user.lastName.invalid.format}")
  private String lastName;
  @Column(name = "phone")
//	@NotEmpty(message = "{hibernate.user.phone.empty.message}")
//	@Pattern(regexp = "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", message = "{hibernate.user.phone.invalid.format}")
  private String phone;
  @Column(name = "sex")
//	@NotEmpty(message = "{hibernate.user.sex.empty.message}")
  private String sex;
  @Column(name = "active")
  private int active;
  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinTable(name = "user_photo", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "photo_id"))
  private Photo photo;
  
  public String getPhone() {
    return phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
  
  public String getSex() {
    return sex;
  }
  
  public void setSex(String sex) {
    this.sex = sex;
  }
  
  public long getId() {
    return id;
  }
  
  public void setId(long id) {
    this.id = id;
  }
  
  public String getPassword() {
    return password;
  }
  
  public void setPassword(String password) {
    this.password = password;
  }
  
  public String getFirstName() {
    return firstName;
  }
  
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }
  
  public String getLastName() {
    return lastName;
  }
  
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  
  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public int getActive() {
    return active;
  }
  
  public void setActive(int active) {
    this.active = active;
  }
  
  public Set<Role> getRoles() {
    return roles;
  }
  
  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
  
  public Photo getPhoto()
  {
    return photo;
  }
  
  public void setPhoto(Photo photo)
  {
    this.photo = photo;
  }
}
