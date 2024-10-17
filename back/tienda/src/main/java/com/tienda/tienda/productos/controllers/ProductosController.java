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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/upload")
    public ResponseEntity<Productos> saveProd(@RequestParam("image") MultipartFile file, @RequestParam("name") String name, @RequestParam("price") Double price){
        try{
            Productos savePr = service.createProductsWithImage(file, name, price);
            return ResponseEntity.ok(savePr);
        }
        catch(Exception ex){
            return ResponseEntity.status(500).body(null);
        }
        
    }

    @PutMapping("/{id}")
    public ResponseEntity<Productos> updateProd(@PathVariable Long id, @RequestParam(required = false) MultipartFile image, @RequestParam(required = false) String name, @RequestParam(required = false) Double price){
        try{
            Productos prod = new Productos();
            if(name != null){   
                prod.setName(name);
            }
            if(price != null){
                prod.setPrice(price);
            }
            if(image != null){
                prod = service.updateProducts(prod, id, image);
            }
            else{
                prod = service.updateProducts(prod, id, null);
            }
            return ResponseEntity.ok(prod);
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
