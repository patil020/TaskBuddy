package com.taskbuddy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordRequestDTO {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
}