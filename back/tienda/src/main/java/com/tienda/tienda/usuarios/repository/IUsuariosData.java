package com.tienda.tienda.usuarios.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tienda.tienda.models.Usuarios;

@Repository
public interface IUsuariosData extends JpaRepository<Usuarios, Long> {
    Optional<Usuarios> findByUsername(String name);
}

