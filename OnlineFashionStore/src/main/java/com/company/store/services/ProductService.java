package com.company.store.services;

import com.company.store.dao.ProductDao;
import com.company.store.models.Inventory;
import com.company.store.models.Product;
import com.company.store.models.ProductInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    public Product fetchProductById(int productId) {
        return productDao.read(productId);
    }

    public void createProduct(Product product) {
        productDao.createProduct(product);
    }

    public ArrayList<ProductInfo> fetchTrendingProducts(int amount) {
        ArrayList<Product> products = productDao.fetchTrendingProducts(amount);
        ArrayList<ProductInfo> productInfos = new ArrayList<>();
        for (Product product : products) {
            productInfos.add(fetchProductInfo(product.getProductId()));
        }
        return productInfos;
    }

    public ProductInfo fetchProductInfo(int productId) {
        Product product = fetchProductById(productId);
        ProductInfo productInfo = new ProductInfo();
        productInfo.setProductId(product.getProductId());
        productInfo.setCategoryId(product.getCategoryId());
        productInfo.setDescription(product.getDescription());
        productInfo.setPostDate(product.getPostDate());
        productInfo.setProductName(product.getName());
        productInfo.setScore(product.getScore());
        ArrayList<Inventory> inventories = productDao.fetchInventories(productId);
        productInfo.setInventories(inventories);
        return productInfo;
    }
}
