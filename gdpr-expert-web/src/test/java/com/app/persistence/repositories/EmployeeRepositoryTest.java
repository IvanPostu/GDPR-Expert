// package com.app.persistence.repositories;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.Date;
// import java.util.List;
// import java.util.NoSuchElementException;
// import java.util.UUID;

// import com.app.domain.entities.DepartmentEntity;
// import com.app.domain.entities.EmployeeEntity;
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
// public class EmployeeRepositoryTest extends _RepositoriesConfiguration {
  
//   @Autowired
//   private OrganisationRepository organisationRepository;
//   @Autowired
//   private UserRepository userRepository;
//   @Autowired
//   private EmployeeRepository employeeRepository;
//   @Autowired
//   private DepartmentRepository departmentRepository;

//   private static final List<EmployeeEntity> employees = new ArrayList<>(2);

//   @Order(1)
//   @Test
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

//     EmployeeEntity e1 = new EmployeeEntity();
//     e1.setDepartment(departmentEntity1);
//     e1.setFirstName("Vasile");
//     e1.setLastName("Vasile");
//     e1.setAddress("53 street");
//     e1.setEmail("q@maiil.ru");
//     e1.setPersonalDataResponsible(true);
//     e1.setPhoneNumber("076666666");

//     EmployeeEntity e2 = new EmployeeEntity();
//     e2.setDepartment(departmentEntity1);
//     e2.setFirstName("Vasile");
//     e2.setLastName("Vasile");
//     e2.setAddress("53 street");
//     e2.setEmail("q@maiil.ru");
//     e2.setPersonalDataResponsible(true);
//     e2.setPhoneNumber("076666666");

//     employeeRepository.save(e1);
//     employeeRepository.save(e2);

//     Assertions.assertTrue(e1.getId() > 0);
//     Assertions.assertTrue(e2.getId() > 0);

//     employees.add(e1);
//     employees.add(e2);
//   }
  
//   @Order(2)
//   @Test
//   public void findByIdTest(){
//     Long employeeId = employees.get(0).getId();
//     EmployeeEntity employeeEntity = employeeRepository.findById(employeeId).get();

//     Assertions.assertNotNull(employeeEntity);
//   }

//   @Order(3)
//   @Test
//   public void updateTest(){
//     Long employeeId = employees.get(0).getId();
//     EmployeeEntity employeeEntity = employeeRepository.findById(employeeId).get();

//     final String newAddress = "updated address 139847813480931";

//     employeeEntity.setAddress(newAddress);
//     employeeRepository.update(employeeEntity);

//     employeeEntity = employeeRepository.findById(employeeId).get();

//     Assertions.assertEquals(employeeEntity.getAddress(), newAddress);
//   }

//   @Order(4)
//   @Test
//   void deleteByIdTest(){
//     Long employeeId = employees.get(0).getId();
//     employeeRepository.deleteById(employeeId);
//     Assertions.assertThrows(NoSuchElementException.class, () -> {
//       employeeRepository.findById(employeeId).get();
//     });
//   }

//   @Test
//   @Order(100)
//   public void deleteAllTest() {
//     employeeRepository.deleteAll();
//     departmentRepository.deleteAll();
//     organisationRepository.deleteAll();
//     userRepository.deleteAll();
//   }

// }
