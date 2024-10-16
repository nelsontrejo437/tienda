package com.tienda.tienda.productos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.tienda.productos.models.Productos;
import com.tienda.tienda.productos.services.ProductosService;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = {"http://localhost:5173"}, allowCredentials = "true")
public class ProductosController {
    private final ProductosService service;

    @Autowired
    public ProductosController(ProductosService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Productos>> getAll(){
        try{
            List<Productos> productos = service.getAllProducts();
            return ResponseEntity.ok(productos);
        }
        catch(Exception ex){
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Productos> saveProd(@RequestBody Productos prod){
        try{
            Productos savePr = service.createProducts(prod);
            return ResponseEntity.ok(savePr);
        }
        catch(Exception ex){
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Productos> updateProd(@RequestBody Productos prod, @PathVariable Long id){
        try{
            Productos updateProd = service.updateProducts(prod, id);
            if(updateProd != null){
                return ResponseEntity.ok(updateProd);
            }
            else {
               return ResponseEntity.notFound().build();
            }
        }
        catch(Exception ex){
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProd(@PathVariable Long id){
        try{
            service.deleteProducts(id);
            return ResponseEntity.ok().build();
        }
        catch(Exception ex){
            return ResponseEntity.status(500).body(null);
        }
    }
}
