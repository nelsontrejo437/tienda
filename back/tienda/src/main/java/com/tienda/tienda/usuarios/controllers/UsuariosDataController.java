package com.tienda.tienda.usuarios.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.tienda.models.Usuarios;
import com.tienda.tienda.usuarios.services.UsuariosDataService;

@RestController
@RequestMapping("/perfil")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "true")
public class UsuariosDataController {
    private final UsuariosDataService service;

    @Autowired
    public UsuariosDataController(UsuariosDataService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Usuarios> getUserAuth(){
        return ResponseEntity.ok(service.obtenerUsers());
    }

}
