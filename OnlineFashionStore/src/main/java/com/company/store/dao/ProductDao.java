package com.company.store.dao;

import com.company.store.models.Inventory;
import com.company.store.models.Product;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProductDao {
    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private InventoryDao inventoryDao;

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

    public ArrayList<Product> fetchTrendingProducts(int amount) {
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "FROM Product";
        Query query = session.createQuery(hql);
        query.setMaxResults(amount);
        ArrayList<Product> products = (ArrayList<Product>) query.list();
        session.getTransaction().commit();
        session.close();
        return products;
    }

    public ArrayList<Inventory> fetchInventories(int productId) {
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "FROM Inventory WHERE productId = '" + productId + "'";
        Query query = session.createQuery(hql);
        ArrayList<Inventory> inventories = (ArrayList<Inventory>) query.list();
        session.getTransaction().commit();
        session.close();
        return inventories;
    }

    public ArrayList<Inventory> filterProducts(String condition) {
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String sql = "SELECT Inventory_ID, Product_ID, Color,"
                + "Size, Price, Image_Link, Quantity FROM "
                + "(SELECT Inventory_ID, Inventory.Product_ID, Color, Size, Price, Image_Link, Quantity, Category FROM "
                + "Inventory LEFT JOIN Product "
                + "ON Inventory.Product_ID = Product.Product_ID) as T WHERE " + condition;
        SQLQuery query = session.createSQLQuery(sql);
        ArrayList<Inventory> inventories = new ArrayList<>();
        for (Object obj : query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list()) {
            Map map = (Map) obj;
            Inventory inventory = new Inventory();
            inventory.setSize(map.get("Size").toString());
            inventory.setInventoryId((Integer) map.get("Inventory_ID"));
            inventory.setProductId((Integer) map.get("Product_ID"));
            inventory.setColor(map.get("Color").toString());
            inventory.setPrice((Double) map.get("Price"));
            inventory.setImageLink(map.get("Image_Link").toString());
            inventory.setQuantity((Integer) map.get("Quantity"));
            inventories.add(inventory);
        }
        session.getTransaction().commit();
        session.close();
        return inventories;
    }

    public List getAllDistinctValues(String table, String columnName) {
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "SELECT DISTINCT " + columnName + " FROM " + table;
        Query query = session.createQuery(hql);
        List values = query.list();
        session.getTransaction().commit();
        session.close();
        return values;
    }
}
