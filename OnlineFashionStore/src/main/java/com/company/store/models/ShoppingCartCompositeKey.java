package com.company.store.models;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ShoppingCartCompositeKey implements Serializable {

    protected Integer customerId;

    protected Integer inventoryId;

    public ShoppingCartCompositeKey() {

    }

    public ShoppingCartCompositeKey(Integer customerId, Integer inventoryId) {
        this.customerId = customerId;
        this.inventoryId = inventoryId;
    }
}
