package com.company.store.dao;

import com.company.store.models.Product;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProductDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void createProduct(Product product) {
        try {
            Session session = sessionFactory.openSession();
            session.beginTransaction();
            Integer id = (Integer) session.save(product);
            System.out.println("Product is created With Id::" + id);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Product read(int productId) {
        Session session = sessionFactory.openSession();

        Product product = session.get(Product.class, productId);
        session.close();
        return product;
    }

    public void update(Product product) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        session.update(product);

        session.getTransaction().commit();
        session.close();
    }

    public void delete(int productId) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        Product product = session.load(Product.class, productId);
        session.delete(product);

        session.getTransaction().commit();
        session.close();
    }
}
