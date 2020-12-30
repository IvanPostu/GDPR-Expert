// package com.app.persistence.repositories;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.Date;
// import java.util.List;
// import java.util.UUID;

// import com.app.domain.entities.DepartmentEntity;
// import com.app.domain.entities.OrganisationEntity;
// import com.app.domain.entities.UserEntity;

// import org.junit.jupiter.api.Assertions;
// import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
// import org.junit.jupiter.api.Order;
// import org.junit.jupiter.api.Tag;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.TestMethodOrder;
// import org.springframework.beans.factory.annotation.Autowired;




// @TestMethodOrder(OrderAnnotation.class)
// @Tag(value = "slow")
// public class DepartmentRepositoryTest extends _RepositoriesConfiguration {

//   @Autowired
//   private DepartmentRepository departmentRepository;
//   @Autowired
//   private OrganisationRepository organisationRepository;
//   @Autowired
//   private UserRepository userRepository;

//   private static final List<DepartmentEntity> departments = new ArrayList<>(2);

//   @Test
//   @Order(1)
//   public void saveTest(){
//     UserEntity fakeUser1 = new UserEntity();
//     fakeUser1.setActive(true);
//     fakeUser1.setEmail(UUID.randomUUID().toString() + "a@mail.ru");
//     fakeUser1.setPassword("p");
//     userRepository.save(fakeUser1);
//     Assertions.assertNotNull(fakeUser1.getId());
//     OrganisationEntity oEntity1 = new OrganisationEntity();
//     oEntity1.setActive(true);
//     oEntity1.setAddress("aaa");
//     oEntity1.setAdministrator("juk");
//     oEntity1.setCreatedOnPlatformAt(LocalDateTime.now());
//     oEntity1.setDepatrments(new ArrayList<>());
//     oEntity1.setDescription("descr...");
//     oEntity1.setEmail("email@mail.ru");
//     oEntity1.setFoundedAt(new Date());
//     oEntity1.setLegalForm("SRL");
//     oEntity1.setName("Organisation Name");
//     oEntity1.setPhoneNumber("099999999");
//     oEntity1.setOwner(fakeUser1);
//     organisationRepository.save(oEntity1);
//     Assertions.assertTrue(oEntity1.getId() > 0);

//     DepartmentEntity departmentEntity1 = new DepartmentEntity();
//     departmentEntity1.setActive(true);
//     departmentEntity1.setCreatedAt(LocalDateTime.now());
//     departmentEntity1.setEmail("aaa@mail.ru");
//     departmentEntity1.setName("TestName");
//     departmentEntity1.setOrganisation(oEntity1);
//     departmentEntity1.setPhoneNumber("0888888888");
//     departmentEntity1.setResponsible("Vasile Siliv");
//     departmentRepository.save(departmentEntity1);

//     DepartmentEntity departmentEntity2 = new DepartmentEntity();
//     departmentEntity2.setActive(true);
//     departmentEntity2.setCreatedAt(LocalDateTime.now());
//     departmentEntity2.setEmail("aaa@mail.ru");
//     departmentEntity2.setName("TestName");
//     departmentEntity2.setOrganisation(oEntity1);
//     departmentEntity2.setPhoneNumber("0888888888");
//     departmentEntity2.setResponsible("Vasile Siliv");
//     departmentRepository.save(departmentEntity2);

//     departments.add(departmentEntity1);
//     departments.add(departmentEntity2);
    
//   }
  
//   @Test
//   @Order(2)
//   void deleteByIdTest(){
//     Long id = departments.get(0).getId();
//     departmentRepository.deleteById(id);
//   }
  
//   @Test
//   @Order(3)
//   void findByIdTest(){
//     Long departmentEntityId = departments.get(1).getId();
//     DepartmentEntity departmentEntity = departmentRepository.findById(departmentEntityId).get();
//     Assertions.assertNotNull(departmentEntity);
//   }

//   @Test
//   @Order(4)
//   void findByNonExistendIdTest(){
//     Long departmentEntityId = departments.get(0).getId();
//     Assertions.assertThrows(Exception.class, () -> {
//       DepartmentEntity departmentEntity = departmentRepository.findById(departmentEntityId).get();
//       Assertions.assertNotNull(departmentEntity);
//     });
//   }

//   @Test
//   @Order(100)
//   public void deleteAllTest() {
//     departmentRepository.deleteAll();
//     organisationRepository.deleteAll();
//     userRepository.deleteAll();
//   }



// }
