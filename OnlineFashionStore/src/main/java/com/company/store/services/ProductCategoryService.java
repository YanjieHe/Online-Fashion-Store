package com.company.store.services;

import com.company.store.dao.ProductCategoryDao;
import com.company.store.models.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductCategoryService {
    @Autowired
    ProductCategoryDao productCategoryDao;

    public ProductCategory fetchProductCategoryById(int productCategoryId) {
        return productCategoryDao.read(productCategoryId);
    }

    public void createProductCategory(ProductCategory productCategory) {
        productCategoryDao.createProductCategory(productCategory);
    }
}
