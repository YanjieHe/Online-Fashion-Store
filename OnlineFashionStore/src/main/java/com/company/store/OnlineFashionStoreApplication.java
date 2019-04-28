package com.company.store;

import com.company.store.models.Product;
import com.company.store.models.ProductCategory;
import com.company.store.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Calendar;
import java.util.GregorianCalendar;


@SpringBootApplication
public class OnlineFashionStoreApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(OnlineFashionStoreApplication.class, args);
    }

    @Autowired
    ProductService productService;

    @Override
    public void run(String... strings) throws Exception {
        InsertProducts();
        InsertProductCategories();
    }

    void InsertProducts() {
        for (int i = 1; i <= 10; i++) {
            Product product = new Product();
            product.setProductId(i);
            product.setCategoryId(10);
            product.setName("Bag");
            product.setPrice(890.0);
            product.setImageLink("https://katespade.insnw.net/KateSpade/PXRUA160_399_1?$large$");
            product.setPostDate(new GregorianCalendar(2019, Calendar.APRIL, 1).getTime());
            product.setColor("red");
            product.setScore(4.0);
            product.setDescription("satchel with zipper closure");

            productService.createProduct(product);
        }
    }

    void InsertProductCategories() {
        for (int i = 1; i <= 10; i++) {
            ProductCategory productCategory = new ProductCategory();
            productCategory.setCategoryId(i);
            productCategory.setCategoryName("Bag " + i);
        }
    }
}
