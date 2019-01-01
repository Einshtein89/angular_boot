package com.nixsolutions.angular_boot.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.nixsolutions.angular_boot.entity.Book;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "books", path = "books")
public interface BookRepository extends PagingAndSortingRepository<Book, Long>
{
  Page getBookByCatalog_Id(@Param("catalogId") long catalogId, Pageable p);
  Page getBookByCatalog_Name(@Param("catalogName") String catalogName, Pageable p);
}
