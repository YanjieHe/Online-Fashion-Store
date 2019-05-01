package com.company.store.dao;

import com.company.store.models.Inventory;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InventoryDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void createInventory(Inventory inventory) {
        try {
            Session session = sessionFactory.openSession();
            session.beginTransaction();
            Integer id = (Integer) session.save(inventory);
            System.out.println("Inventory is created With Id::" + id);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Inventory read(int inventoryId) {
        Session session = sessionFactory.openSession();

        Inventory inventory = session.get(Inventory.class, inventoryId);
        session.close();
        return inventory;
    }

    public void update(Inventory inventory) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        session.update(inventory);

        session.getTransaction().commit();
        session.close();
    }

    public void delete(int inventoryId) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        Inventory inventory = session.load(Inventory.class, inventoryId);
        session.delete(inventory);

        session.getTransaction().commit();
        session.close();
    }
}
