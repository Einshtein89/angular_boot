package com.nixsolutions.angular_boot;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.nixsolutions.angular_boot.dao.BookRepository;
import com.nixsolutions.angular_boot.dao.CatalogRepository;
import com.nixsolutions.angular_boot.dao.OrderRepository;
import com.nixsolutions.angular_boot.dao.PhotoRepository;
import com.nixsolutions.angular_boot.dao.RoleRepository;
import com.nixsolutions.angular_boot.dao.UserRepository;
import com.nixsolutions.angular_boot.entity.Book;
import com.nixsolutions.angular_boot.entity.Catalog;
import com.nixsolutions.angular_boot.entity.users.Role;
import com.nixsolutions.angular_boot.entity.users.User;

@SpringBootApplication
@EnableMongoRepositories
public class AngularBootApplication implements CommandLineRunner
{

  @Autowired
  private BookRepository bookRepository;
  @Autowired
  private CatalogRepository catalogRepository;
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PhotoRepository photoRepository;
  @Autowired
  private OrderRepository orderRepository;

	private static final Logger log = LoggerFactory.getLogger(AngularBootApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AngularBootApplication.class, args);
	}

  @Override
  public void run(String... strings) throws Exception
  {
    bookRepository.deleteAll();
    catalogRepository.deleteAll();
    roleRepository.deleteAll();
    userRepository.deleteAll();
    photoRepository.deleteAll();
    orderRepository.deleteAll();

    List<Catalog> catalogs = new ArrayList<>();
    catalogs.add(new Catalog("Sci-Fi"));
    catalogs.add(new Catalog("Fantasy"));
    catalogs.add(new Catalog("Novel"));
    catalogs.add(new Catalog("Physics"));
    catalogRepository.save(catalogs);

    List<Book> books = new ArrayList<>();
    Book sciFiBook1 = new Book("John Snow", "I know nothing", 200.99, catalogRepository.findCatalogByName("Sci-Fi"));
    Book fantasyBook1 = new Book("Steve Jobs", "Eat Apples", 599.99, catalogRepository.findCatalogByName("Fantasy"));
    books.add(sciFiBook1);
    books.add(fantasyBook1);
    bookRepository.save(books);

    List<Role> roles = new ArrayList<>();
    Role user = new Role("USER");
    roles.add(user);
    Role admin = new Role("ADMIN");
    roles.add(admin);
    roleRepository.save(roles);

    List<User> users = new ArrayList<>();
    User user1 = new User("admin@admin.ru", "$2a$10$OD794y37YTf4lmdXWtqks.QVdoAVaE0EXhfK2QF2dy33ek6GyC6gy",
        "Jack", "Bauer", "1234567890", "man",
        new HashSet<>(Collections.singletonList(roleRepository.findByRole("ADMIN"))));
    userRepository.save(user1);

    User byEmail = userRepository.findByEmail("admin@admin.ru");
    List<User> byFirstNameAndLastName = userRepository.findByFirstNameAndLastName("Jack", "Bauer");

//    List<Book> bookByCatalog_id = bookRepository
//        .findByCatalog(catalogRepository.findCatalogByName("Sci-Fi").getId());
    Page bookByCatalogId = bookRepository
        .findByCatalogId(catalogRepository.findCatalogByName("Sci-Fi").getId(), new PageRequest(0, 10));
//    Page bookByCatalogName = bookRepository
//        .findByCatalogName(catalogRepository.findCatalogByName("Sci-Fi").getName(), new PageRequest(0, 10));
    int a = 0;
//    System.out.println(bookByCatalogId.getCatalog());

  }
}
