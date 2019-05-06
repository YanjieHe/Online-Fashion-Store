package com.company.store.services;

import com.company.store.dao.ShoppingCartDao;
import com.company.store.models.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ShoppingCartService {
    @Autowired
    ShoppingCartDao shoppingCartDao;

    public void createShoppingCartItem(ShoppingCart shoppingCart) {
        shoppingCartDao.createShoppingCart(shoppingCart);
    }

    public ArrayList<ShoppingCart> getAllShoppingCartItems(int customerId) {
        return shoppingCartDao.getAllShoppingCartItems(customerId);
    }
}
