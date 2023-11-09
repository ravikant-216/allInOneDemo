package com.example.demo.controller;

import com.example.demo.dto.GetStudent;
import com.example.demo.dto.SetStudent;
import com.example.demo.service.IStudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private IStudentService studentService;

    @GetMapping
    public ResponseEntity<List<GetStudent>> getAllUsers(){
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    @GetMapping("/{id}")
    public ResponseEntity<GetStudent> getUserById(@PathVariable int id){
        return ResponseEntity.ok(studentService.getStudentById(id));
    }
    @GetMapping("/{page}/{size}/{sortField}")
    public ResponseEntity<List<GetStudent>> getAllUsersWithSort(@PathVariable int page,@PathVariable int size,@PathVariable String sortField){
        return ResponseEntity.ok(studentService.getAllStudentsWithSort(page, size, sortField));
    }

    @PostMapping
    public ResponseEntity<GetStudent> saveUser(@Valid  @RequestBody SetStudent user){
        return ResponseEntity.ok(studentService.saveStudent(user));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id){
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<GetStudent> updateUser(@Valid @RequestBody SetStudent user,@PathVariable int id){
        return ResponseEntity.ok(studentService.updateStudent(user,id));
    }
}