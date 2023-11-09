package com.example.demo.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SetStudent {
    @NotBlank(message = "Name is required")
    private String name;
    @NotNull(message = "Age is required")
    private int age;
    @NotNull(message = "Mark is required")
    private int mark;
}