package com.company.store.dao;

import com.company.store.models.Order;
import com.company.store.models.ShoppingCart;
import com.company.store.models.ShoppingCart;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ShoppingCartDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void createShoppingCart(ShoppingCart shoppingCart) {
        try {
            Session session = sessionFactory.openSession();
            session.beginTransaction();
            Integer id = (Integer) session.save(shoppingCart);
            System.out.println("ShoppingCart is created With Id::" + id);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ShoppingCart read(int orderId) {
        Session session = sessionFactory.openSession();

        Order order = session.get(Order.class, orderId);
        session.close();
        return order;
    }

    public void update(Order order) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        session.update(order);

        session.getTransaction().commit();
        session.close();
    }

    public void delete(int orderId) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        Order order = session.load(Order.class, orderId);
        session.delete(order);

        session.getTransaction().commit();
        session.close();
    }

}
