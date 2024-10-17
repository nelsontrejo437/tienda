package com.tienda.tienda.usuarios.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.tienda.tienda.models.Usuarios;
import com.tienda.tienda.usuarios.repository.IUsuariosData;

@Service
public class UsuariosDataService {
    private final IUsuariosData repo;

    @Autowired
    public UsuariosDataService(IUsuariosData repo) {
        this.repo = repo;
    }
    
    public Usuarios obtenerUsers(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 

        if(principal instanceof UserDetails){
            String username = ((UserDetails)principal).getUsername();
            Optional<Usuarios> usuarios = repo.findByUsername(username);
            return usuarios.orElse(null);
        }
        return null;
    }
}
