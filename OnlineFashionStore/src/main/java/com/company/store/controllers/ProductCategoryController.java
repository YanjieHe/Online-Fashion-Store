package com.company.store.controllers;

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
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> fetchProductById(@PathVariable(name = "id") int productCategoryId) {
        Object product = productCategoryService.fetchProductCategoryById(productCategoryId);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}
