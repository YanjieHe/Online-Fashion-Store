package com.company.store.controllers;

import com.company.store.models.Inventory;
import com.company.store.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @RequestMapping(value = "/inventory/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getInventoryById(@PathVariable(name = "id") int inventoryId) {
        Inventory inventory = inventoryService.fetchInventoryById(inventoryId);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    @RequestMapping(value = "/inventory_list/", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getInventoryListByIdList(@RequestBody ArrayList<Integer> idList) {
        ArrayList<Inventory> inventoryList = new ArrayList<Inventory>();
        for (int inventoryId : idList) {
            Inventory inventory = inventoryService.fetchInventoryById(inventoryId);
            inventoryList.add(inventory);
        }
        return new ResponseEntity<>(inventoryList, HttpStatus.OK);
    }
}
