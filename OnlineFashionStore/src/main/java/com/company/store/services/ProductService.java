package com.company.store.services;

import com.company.store.dao.ProductDao;
import com.company.store.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    public Product fetchProductById(int productId) {
        return productDao.read(productId);
    }

    public void createProduct(Product product){
        productDao.createProduct(product);
    }
}
