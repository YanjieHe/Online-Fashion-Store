package com.company.store.services;

import java.util.ArrayList;
import java.util.HashMap;

import com.company.store.dao.ProductCategoryDao;
import com.company.store.dao.ProductDao;
import com.company.store.models.Inventory;
import com.company.store.models.Product;
import com.company.store.models.ProductInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                    query.append("OR ").append(category).append(" = '").append(item).append("' ");
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
        first = addFilter(query, first, "Category", parameters);
        if (first) {
            return fetchTrendingProducts(12);
        } else {
            ArrayList<Inventory> inventories = productDao.filterProducts(query.toString());
            for (Inventory inventory : inventories) {
                ProductInfo productInfo = fetchProductInfo(inventory.getProductId());
                result.add(productInfo);
            }
            return result;
        }
    }

    public ArrayList<String> getAllColor() {
        return (ArrayList<String>) productDao.getAllDistinctValues("Inventory", "color");
    }

    public ArrayList<String> getAllSize() {
        return (ArrayList<String>) productDao.getAllDistinctValues("Inventory", "size");
    }

    public ArrayList<String> getAllCategories() {
//        ArrayList<Integer> categoryIdList = (ArrayList<Integer>) productDao.getAllDistinctValues("Product", "categoryId");
//        ArrayList<String> categoryList = new ArrayList<>();
//        for (int id : categoryIdList) {
//            ProductCategory category = productCategoryDao.read(id);
//            categoryList.add(category.getCategoryName());
//        }
//        return categoryList;
        return (ArrayList<String>) productDao.getAllDistinctValues("Product", "category");
    }

    public HashMap<String, ArrayList<String>> getDistinctValues() {
        ArrayList<String> colorList = getAllColor();
        ArrayList<String> sizeList = getAllSize();
        ArrayList<String> categoryList = getAllCategories();
        HashMap<String, ArrayList<String>> map = new HashMap<>();
        map.put("Color", new ArrayList<String>());
        map.put("Size", new ArrayList<String>());
        map.put("Category", new ArrayList<>());
        for (String color : colorList) {
            map.get("Color").add(color);
        }
        for (String size : sizeList) {
            map.get("Size").add(size);
        }
        for (String category : categoryList) {
            map.get("Category").add(category);
        }
        return map;
    }
}
