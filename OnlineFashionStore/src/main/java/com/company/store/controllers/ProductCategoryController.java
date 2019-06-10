package com.company.store.controllers;

import com.company.store.models.ProductCategory;
import com.company.store.services.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductCategoryController {

    @Autowired
    ProductCategoryService productCategoryService;

    @RequestMapping(value = "/product_categories/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> fetchProductCategoryById(@PathVariable(name = "id") int productCategoryId) {
        ProductCategory productCategory = productCategoryService.fetchProductCategoryById(productCategoryId);
        return new ResponseEntity<>(productCategory, HttpStatus.OK);
    }
}
