package com.tienda.tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tienda.tienda.models.Usuarios;
import java.util.Optional;


@Repository
public interface IUsuarios extends JpaRepository<Usuarios, Long> {
    Optional<Usuarios> findByUsername(String name);
}
