package com.company.store.controllers;

import com.company.store.models.Inventory;
import com.company.store.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @RequestMapping(value = "/inventory/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getInventoryById(@PathVariable(name = "id") int invertoryId ){
        Inventory inventory = inventoryService.fetchInventoryById(invertoryId);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }
}
