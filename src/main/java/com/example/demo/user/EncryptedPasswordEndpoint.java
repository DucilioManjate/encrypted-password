package com.example.demo.user;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/passwords/api")
public class EncryptedPasswordEndpoint {

    @Autowired
    private EncryptedPasswordService encryptedPasswordService;

    @Autowired
    public EncryptedPasswordEndpoint(EncryptedPasswordService encryptedPasswordService){
    }

    public EncryptedPasswordEntity unencrypt(EncryptedPasswordEntity encryptedPasswordEntity){
        byte[] decoded = Base64.getDecoder().decode(encryptedPasswordEntity.getPassword());
        String decodedString = new String(decoded);
        encryptedPasswordEntity.setPassword(decodedString);
        return encryptedPasswordEntity;

    }
    @GetMapping("/")
    public ResponseEntity<List<EncryptedPasswordEntity>> getAllRequest() {
        return ResponseEntity.status(HttpStatus.OK).body(encryptedPasswordService.findAll().stream().map(this::unencrypt).collect(Collectors.toList()));
    }
    @PostMapping("/")
    public ResponseEntity<Object> saveRequest(@RequestBody @Valid EncryptedPasswordResponce passwordDto) {
        var requestEntity = new EncryptedPasswordEntity();
        String original = passwordDto.getPassword();
        String encoded = Base64.getEncoder().encodeToString(original.getBytes());
        passwordDto.setPassword(encoded);
        BeanUtils.copyProperties(passwordDto, requestEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(encryptedPasswordService.store(requestEntity));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getOnerequest(@PathVariable(value = "id") Long id) {
        Optional<EncryptedPasswordEntity> requestEntityOptional = encryptedPasswordService.findById(id);
        if (!requestEntityOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request Undfind.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(requestEntityOptional.get());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> remove(@PathVariable(value = "id") long id) {
        Optional<EncryptedPasswordEntity> requestEntityOptional = encryptedPasswordService.findById(id);
        if (!requestEntityOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Upzzz. bad request");
        }
        encryptedPasswordService.delete(requestEntityOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("sucessFully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> editResquest(@PathVariable(value = "id") Long id, @RequestBody @Valid EncryptedPasswordResponce passwordDto) {
        Optional<EncryptedPasswordEntity> requestEntityOptional = encryptedPasswordService.findById(id);
        if (!requestEntityOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("request not found.");
        }
        var requestEntity = new EncryptedPasswordEntity();
        BeanUtils.copyProperties(passwordDto, requestEntity);
        requestEntity.setId(requestEntityOptional.get().getId());
        return ResponseEntity.status(HttpStatus.OK).body(encryptedPasswordService.store(requestEntity));
    }

}
