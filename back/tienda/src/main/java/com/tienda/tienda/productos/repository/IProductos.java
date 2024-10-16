package com.tienda.tienda.productos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tienda.tienda.productos.models.Productos;

@Repository
public interface IProductos extends JpaRepository<Productos, Long> {
    Optional<Productos> findByName(String name);
}
