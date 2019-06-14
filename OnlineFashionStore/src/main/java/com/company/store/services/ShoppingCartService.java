package com.company.store.services;


import com.company.store.dao.ShoppingCartDao;
import com.company.store.models.Inventory;
import com.company.store.models.Product;
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

    @Autowired
    ProductService productService;

    @Autowired
    InventoryService inventoryService;

    public void createShoppingCartItem(int customerId, int inventoryId, Date date, int quantity) {
        shoppingCartDao.createShoppingCart(new ShoppingCartCompositeKey(customerId, inventoryId));
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCustomerId(customerId);
        shoppingCart.setInventoryId(inventoryId);
        shoppingCart.setDate(date);
        shoppingCart.setQuantity(quantity);
        shoppingCartDao.update(shoppingCart);
    }

    public static class ShoppingCartItemInfo {
        private Integer customerId;
        private Integer inventoryId;
        private String name;
        private String imageLink;
        private Integer quantity;
        private Double price;
        private String color;
        private String size;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getImageLink() {
            return imageLink;
        }

        public void setImageLink(String imageLink) {
            this.imageLink = imageLink;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }

        public Integer getCustomerId() {
            return customerId;
        }

        public void setCustomerId(Integer customerId) {
            this.customerId = customerId;
        }

        public Integer getInventoryId() {
            return inventoryId;
        }

        public void setInventoryId(Integer inventoryId) {
            this.inventoryId = inventoryId;
        }
    }

    public ArrayList<ShoppingCartItemInfo> getAllShoppingCartItems(int customerId) {
        ArrayList<ShoppingCart> shoppingCartArrayList = shoppingCartDao.getAllShoppingCartItems(customerId);
        ArrayList<ShoppingCartItemInfo> result = new ArrayList<>();
        for (ShoppingCart shoppingCart : shoppingCartArrayList) {
            ShoppingCartItemInfo item = new ShoppingCartItemInfo();
            item.setCustomerId(shoppingCart.getCustomerId());
            item.setInventoryId(shoppingCart.getInventoryId());
            item.setQuantity(shoppingCart.getQuantity());
            Inventory inventory = inventoryService.fetchInventoryById(shoppingCart.getInventoryId());
            item.setColor(inventory.getColor());
            item.setImageLink(inventory.getImageLink());
            item.setPrice(inventory.getPrice());
            item.setSize(inventory.getSize());
            Product product = productService.fetchProductById(inventory.getProductId());
            item.setName(product.getName());
            result.add(item);
        }
        return result;
    }
}
