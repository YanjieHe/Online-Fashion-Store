package com.company.store.dao;

import com.company.store.models.ShoppingCart;
import com.company.store.models.ShoppingCartCompositeKey;
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

}
