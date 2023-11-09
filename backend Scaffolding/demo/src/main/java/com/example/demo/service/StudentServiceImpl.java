package com.example.demo.service;

import com.example.demo.dto.GetStudent;
import com.example.demo.dto.SetStudent;
import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
@Service
public class StudentServiceImpl implements IStudentService{
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<GetStudent> getAllStudents() {
        return modelMapper.map(studentRepository.findAll(),List.class);
    }


    public List<GetStudent> getAllStudentsWithSort(int page, int size, String sortField) {
        Page<Student> students=modelMapper.map(studentRepository.findAll(PageRequest.of(page, size).withSort(Sort.by(sortField))), Page.class);
        return modelMapper.map(students.getContent(),List.class);
    }



    public GetStudent getStudentById(int id) {
        if(studentRepository.findById(id).isPresent()){
            return modelMapper.map(studentRepository.findById(id).get(),GetStudent.class);
        }
        else
            throw new NoSuchElementException("Student not found with id : "+ id);
    }


    public GetStudent saveStudent(SetStudent student) {
        return modelMapper.map(studentRepository.save(modelMapper.map(student, Student.class)),GetStudent.class);
    }


    public GetStudent updateStudent(SetStudent student, int id) {
        if(studentRepository.findById(id).isPresent()){
            Student student1= modelMapper.map(student,Student.class);
            student1.setId(id);
            return modelMapper.map(studentRepository.save(student1),GetStudent.class);
        }
        else
            throw new NoSuchElementException("Student not found with id : "+ id);
    }


    public void deleteStudent(int id) {
        if(studentRepository.findById(id).isPresent())
            studentRepository.deleteById(id);
        else
            throw new NoSuchElementException("Student not found with id : "+ id);

    }
}
