package com.company.store.dao;

import com.company.store.models.Customer;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void createCustomer(Customer customer) {
        try {
            Session session = sessionFactory.openSession();
            session.beginTransaction();
            Integer id = (Integer) session.save(customer);
            System.out.println("Customer is created With Id::" + id);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Customer read(int customerId) {
        Session session = sessionFactory.openSession();

        Customer customer = session.get(Customer.class, customerId);
        session.close();
        return customer;
    }

    public void update(Customer customer) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        session.update(customer);

        session.getTransaction().commit();
        session.close();
    }

    public void delete(int customerId) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        Customer customer = session.load(Customer.class, customerId);
        session.delete(customer);

        session.getTransaction().commit();
        session.close();
    }

}
