package com.company.store.services;

import com.company.store.dao.OrderDao;
import com.company.store.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderDao orderDao;

    public Order fetchOrderById(int orderId) {
        return orderDao.read(orderId);
    }

    public void createOrder(Order order) {
        orderDao.createOrder(order);
    }
}
