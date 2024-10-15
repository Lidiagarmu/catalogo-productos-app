package com.example.productcatalog.service;

import com.example.productcatalog.model.Product;
import com.example.productcatalog.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

   /* public List<Product> searchProductByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }*/

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
