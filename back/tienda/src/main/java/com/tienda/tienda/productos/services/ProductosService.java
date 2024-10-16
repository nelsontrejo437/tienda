package com.tienda.tienda.productos.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.tienda.productos.models.Productos;
import com.tienda.tienda.productos.repository.IProductos;

@Service
public class ProductosService {
    private final IProductos repo;

    @Autowired
    public ProductosService(IProductos repo) {
        this.repo = repo;
    }

    public List<Productos> getAllProducts(){
        return repo.findAll();
    }

    public Productos createProducts(Productos prod){
        return repo.save(prod);
    }

    public Productos updateProducts(Productos prod, Long id){
        Optional<Productos> opProd = repo.findById(id);

        if(opProd.isPresent()){
            Productos prodEd  = opProd.get();
            prodEd.setName(prod.getName());
            prodEd.setPrice(prod.getPrice());
            return repo.save(prodEd);
        }
        return null;
    }

    public void deleteProducts(Long id){
        if(repo.existsById(id)){
            repo.deleteById(id);
        } else{
            throw new RuntimeException("No se encontro el producto");
        }
    }
}
