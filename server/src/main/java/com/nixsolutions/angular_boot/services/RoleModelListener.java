package com.nixsolutions.angular_boot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.stereotype.Component;

import com.nixsolutions.angular_boot.entity.Book;
import com.nixsolutions.angular_boot.entity.users.Role;

@Component
public class RoleModelListener extends AbstractMongoEventListener<Role>
{
  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;

  @Override
  public void onBeforeConvert(BeforeConvertEvent<Role> event)
  {
    if (event.getSource().getId() < 1)
    {
      event.getSource().setId(sequenceGeneratorService.generateSequence(Role.SEQUENCE_NAME));
    }

  }

  @Override
  public void onBeforeSave(BeforeSaveEvent<Role> event) {
    //any kind of operations with entity berofew saving to DB
  }
}
