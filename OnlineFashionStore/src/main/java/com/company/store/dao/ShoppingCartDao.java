package com.company.store.dao;

import com.company.store.models.ShoppingCart;
import com.company.store.models.ShoppingCartCompositeKey;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class ShoppingCartDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void createShoppingCart(ShoppingCartCompositeKey shoppingCartCompositeKey) {
        try {
            Session session = sessionFactory.openSession();
            session.beginTransaction();
            Integer id = (Integer) session.save(shoppingCartCompositeKey);
            System.out.println("ShoppingCart is created With Id::" + id);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ShoppingCart read(ShoppingCartCompositeKey shoppingCartCompositeKey) {
        Session session = sessionFactory.openSession();

        ShoppingCart shoppingCart = session.get(ShoppingCart.class, shoppingCartCompositeKey);
        session.close();
        return shoppingCart;
    }

    public void update(ShoppingCart shoppingCart) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        session.update(shoppingCart);

        session.getTransaction().commit();
        session.close();
    }

    public void delete(ShoppingCartCompositeKey shoppingCartCompositeKey) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        ShoppingCart shoppingCart = session.load(ShoppingCart.class, shoppingCartCompositeKey);
        session.delete(shoppingCart);

        session.getTransaction().commit();
        session.close();
    }

    public ArrayList<ShoppingCart> getAllShoppingCartItems(int customerId) {
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "FROM ShoppingCart WHERE customerId = '" + customerId + "'";
        Query query = session.createQuery(hql);
        return (ArrayList<ShoppingCart>) query.list();
    }
}
