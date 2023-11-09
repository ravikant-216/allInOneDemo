package com.example.demo.service;

import com.example.demo.dto.GetStudent;
import com.example.demo.dto.SetStudent;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IStudentService {
    List<GetStudent> getAllStudents();

    List<GetStudent> getAllStudentsWithSort(int page, int size, String sortField);

    GetStudent getStudentById(int id);

    GetStudent saveStudent(SetStudent Student);

    GetStudent updateStudent(SetStudent Student, int id);

    void deleteStudent(int id);
}