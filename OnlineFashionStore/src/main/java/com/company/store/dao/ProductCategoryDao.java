package com.company.store.dao;
import com.company.store.models.ProductCategory;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProductCategoryDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void createProductCategory(ProductCategory productCategory) {
        try {
            Session session = sessionFactory.openSession();
            session.beginTransaction();
            Integer id = (Integer) session.save(productCategory);
            System.out.println("ProductCategory is created With Id::" + id);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ProductCategory read(int categoryId) {
        Session session = sessionFactory.openSession();

        ProductCategory productCategory = session.get(ProductCategory.class, categoryId);
        session.close();
        return productCategory;
    }

    public void update(ProductCategory productCategory) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        session.update(productCategory);

        session.getTransaction().commit();
        session.close();
    }

    public void delete(int categoryId) {

        Session session = sessionFactory.openSession();
        session.beginTransaction();

        ProductCategory productCategory = session.load(ProductCategory.class, categoryId);
        session.delete(productCategory);

        session.getTransaction().commit();
        session.close();
    }
}
