package com.company.store.models;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ShoppingCartCompositeKey implements Serializable {

    private Integer customerId;

    private Integer inventoryId;

    public ShoppingCartCompositeKey() {

    }

    public ShoppingCartCompositeKey(Integer customerId, Integer inventoryId) {
        this.customerId = customerId;
        this.inventoryId = inventoryId;
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
