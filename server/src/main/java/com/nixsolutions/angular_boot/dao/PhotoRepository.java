package com.nixsolutions.angular_boot.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nixsolutions.angular_boot.entity.users.Photo;

public interface PhotoRepository extends MongoRepository<Photo, Integer>
{
}
