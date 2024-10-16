package com.tienda.tienda.services;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tienda.tienda.models.Usuarios;
import com.tienda.tienda.repository.IUsuarios;

@Service
public class UsuariosService implements UserDetailsService {
    private final IUsuarios repo;

    @Autowired
    public UsuariosService(IUsuarios repo) {
        this.repo = repo;
    }

    public Usuarios createUsers(Usuarios usuarios){
        return repo.save(usuarios);
    }


    public Optional<Usuarios> findByUsername(String name) {
        return repo.findByUsername(name);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Usuarios user = repo.findByUsername(username).orElse(null);
       if(user == null){
        throw new UsernameNotFoundException("usuario no encontrado");
       }

       return new User(user.getUsername(), user.getPassword(), user.getAuthorities());
    }
}
