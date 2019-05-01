package com.company.store.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.util.Date;

@Entity
@IdClass(ShoppingCartCompositeKey.class)
public class ShoppingCart {
    @Id
    @Column(name = "Customer_ID")
    private Integer customerId;

    @Id
    @Column(name = "Inventory_ID")
    private Integer inventoryId;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "Adding_Date")
    private Date date;


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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
