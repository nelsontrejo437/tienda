package com.tienda.tienda.productos.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;

import com.tienda.tienda.productos.models.Productos;
import com.tienda.tienda.productos.repository.IProductos;
import java.nio.file.Path;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;


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

    public Productos createProductsWithImage(MultipartFile file, String name, Double price) throws IOException{
        String fileName = UUID.randomUUID().toString()+ "_"+file.getOriginalFilename();
        Path imagePath = Paths.get("uploads").resolve(fileName);
        Files.copy(file.getInputStream(), imagePath);

        Productos prod = new Productos();
        prod.setName(name);
        prod.setPrice(price);
        prod.setImageUrl(imagePath.toString());

        return repo.save(prod);   
    }

    public Productos updateProducts(Productos prod, Long id, MultipartFile image) throws IOException{
        Optional<Productos> opProd = repo.findById(id);

        if(opProd.isPresent()){
            Productos prodEd = opProd.get();
            if(prod.getName() != null){
                prodEd.setName(prod.getName());
            }
            if(prod.getPrice() != null){
                prodEd.setPrice(prod.getPrice());
            }
            if(image != null){
                String fileName = UUID.randomUUID().toString()+ "_"+image.getOriginalFilename();
                Path imagePath = Paths.get("uploads").resolve(fileName);
                Files.copy(image.getInputStream(), imagePath);
                prodEd.setImageUrl(imagePath.toString());
            }
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
