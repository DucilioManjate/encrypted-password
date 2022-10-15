package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EncryptedPasswordService {
    @Autowired
    private EncryptedPasswordRepository passwordRepository;

    PasswordEncoder passwordEncoder;

    public EncryptedPasswordService(EncryptedPasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public EncryptedPasswordEntity store(EncryptedPasswordEntity encryptedPassword) {
        return passwordRepository.save(encryptedPassword);
    }

    public List<EncryptedPasswordEntity> findAll() {
        return passwordRepository.findAll();
    }

    public Optional<EncryptedPasswordEntity> findById(Long id) {
        return passwordRepository.findById(id);
    }

    @Transactional
    public void delete(EncryptedPasswordEntity PasswordEntity) {
        passwordRepository.delete(PasswordEntity);
    }
}
