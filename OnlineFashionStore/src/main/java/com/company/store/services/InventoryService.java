package com.company.store.services;

import com.company.store.dao.InventoryDao;
import com.company.store.models.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {
    @Autowired
    private InventoryDao inventoryDao;

    public Inventory fetchInventoryById(int inventoryId) {
        return inventoryDao.read(inventoryId);
    }

    public void createInventory(Inventory inventory) {
        inventoryDao.createInventory(inventory);
    }
}
