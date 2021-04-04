package com.nixsolutions.angular_boot.entity.users;

import javax.persistence.*;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RequiredArgsConstructor
@ToString
@Getter
@Setter
@Document(collection = "roles")
public class Role {

  @Transient
  public static final String SEQUENCE_NAME = "roles_sequence";

  private long id;
  @NonNull
  private String role;

}
