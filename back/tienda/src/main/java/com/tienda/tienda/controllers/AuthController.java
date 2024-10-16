package com.tienda.tienda.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.tienda.models.LoginRequest;
import com.tienda.tienda.models.Usuarios;
import com.tienda.tienda.services.UsuariosService;
import com.tienda.tienda.utils.JwtUtils;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins =  {"http://localhost:5173"}, allowCredentials = "true")
public class AuthController {
    private final UsuariosService service;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder encoder;

    @Autowired
    public AuthController(UsuariosService service, JwtUtils jwtUtils, PasswordEncoder encoder) {
        this.service = service;
        this.jwtUtils = jwtUtils;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Usuarios> usersCreate(@RequestBody Usuarios users){
        users.setPassword(encoder.encode(users.getPassword()));
        Usuarios user = service.createUsers(users);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> usersLogin(@RequestBody LoginRequest request){
        Optional<Usuarios> opUsers = service.findByUsername(request.getUsername());

        if(opUsers.isPresent() && encoder.matches(request.getPassword(), opUsers.get().getPassword())){
            String token = jwtUtils.generateToken(request.getUsername());
            //return ResponseEntity.ok(token);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
