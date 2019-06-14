package com.company.store.services;

import com.company.store.dao.ProductDao;
import com.company.store.models.Inventory;
import com.company.store.models.Product;
import com.company.store.models.ProductInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

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

    private static boolean addFilter(StringBuilder query, boolean first, String category, HashMap<String, ArrayList<String>> parameters) {
        if (parameters.containsKey(category)) {
            ArrayList<String> items = parameters.get(category);
            for (String item : items) {
                if (first) {
                    query.append(category).append(" = ").append("'").append(item).append("' ");
                    first = false;
                } else {
                    query.append("and ").append(category).append(" = '").append(item).append("' ");
                }
            }
        }
        return first;
    }

    public ArrayList<ProductInfo> filterProducts(HashMap<String, ArrayList<String>> parameters) {
        ArrayList<ProductInfo> result = new ArrayList<>();
        StringBuilder query = new StringBuilder();
        boolean first = true;
        first = addFilter(query, first, "Size", parameters);
        first = addFilter(query, first, "Color", parameters);
        ArrayList<Inventory> inventories = productDao.filterProducts(query.toString());
        for (Inventory inventory : inventories) {
            ProductInfo productInfo = new ProductInfo();
            Product product = productDao.read(inventory.getProductId());
            productInfo.setProductName(product.getName());
            productInfo.setScore(product.getScore());
            productInfo.setDescription(product.getDescription());
            productInfo.setCategoryId(product.getCategoryId());
            productInfo.setPostDate(product.getPostDate());
            productInfo.setProductId(product.getProductId());
            result.add(productInfo);
        }
        return result;
    }
}
