package com.company.store.services;


import com.company.store.dao.ShoppingCartDao;
import com.company.store.models.ShoppingCartCompositeKey;
import com.company.store.models.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class ShoppingCartService {
    @Autowired
    ShoppingCartDao shoppingCartDao;

    public void createShoppingCartItem(int customerId, int inventoryId, Date date, int quantity) {
        shoppingCartDao.createShoppingCart(new ShoppingCartCompositeKey(customerId,inventoryId));
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCustomerId(customerId);
        shoppingCart.setInventoryId(inventoryId);
        shoppingCart.setDate(date);
        shoppingCart.setQuantity(quantity);
        shoppingCartDao.update(shoppingCart);
    }

    public ArrayList<ShoppingCart> getAllShoppingCartItems(int customerId) {
        return shoppingCartDao.getAllShoppingCartItems(customerId);
    }

}
