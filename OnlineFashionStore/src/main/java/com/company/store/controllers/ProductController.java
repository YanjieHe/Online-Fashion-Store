package com.company.store.controllers;

import java.util.ArrayList;
import java.util.HashMap;

import com.company.store.models.ProductInfo;
import com.company.store.services.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/products/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> fetchProductById(@PathVariable(name = "id") int productId) {
        ProductInfo productInfo = productService.fetchProductInfo(productId);
        return new ResponseEntity<>(productInfo, HttpStatus.OK);
    }

    @RequestMapping(value = "/trending_products/{amount}", method = RequestMethod.GET)
    public ResponseEntity<Object> fetchTrendingProducts(@PathVariable(name = "amount") int amount) {
        ArrayList<ProductInfo> productInfos = productService.fetchTrendingProducts(amount);
        return new ResponseEntity<>(productInfos, HttpStatus.OK);
    }

    @RequestMapping(value = "/filter_products", method = RequestMethod.POST)
    public ResponseEntity<Object> filterProducts(@RequestBody HashMap<String, HashMap<String, Boolean>> parameters) {
        HashMap<String, ArrayList<String>> params = new HashMap<>();
        for (String key : parameters.keySet()) {
            HashMap<String, Boolean> map = parameters.get(key);
            ArrayList<String> items = new ArrayList<>();
            for (String k : map.keySet()) {
                if (map.get(k)) {
                    items.add(k);
                }
            }
            params.put(key, items);
        }
        ArrayList<ProductInfo> productInfoArrayList = productService.filterProducts(params);
        return new ResponseEntity<>(productInfoArrayList, HttpStatus.OK);
    }

    @RequestMapping(value = "/distinct_values", method = RequestMethod.GET)
    public ResponseEntity<Object> getDistinctValues() {
        return new ResponseEntity<>(productService.getDistinctValues(), HttpStatus.OK);
    }
}
