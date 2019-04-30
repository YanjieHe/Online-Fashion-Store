package com.company.store;

import com.company.store.models.Product;
import com.company.store.models.ProductCategory;
import com.company.store.services.ProductCategoryService;
import com.company.store.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;


@SpringBootApplication
public class OnlineFashionStoreApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(OnlineFashionStoreApplication.class, args);
    }

    @Autowired
    ProductService productService;

    @Autowired
    ProductCategoryService productCategoryService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void run(String... strings) throws Exception {
        InsertProducts();
        InsertProductCategories();
    }

    void InsertProducts() {
//        for (int i = 1; i <= 10; i++) {
//            Product product = new Product();
//            product.setProductId(i);
//            product.setCategoryId(10);
//            product.setName("Bag");
//            product.setPrice(890.0);
//            product.setImageLink("https://katespade.insnw.net/KateSpade/PXRUA160_399_1?$large$");
//            product.setPostDate(new GregorianCalendar(2019, Calendar.APRIL, 1).getTime());
//            product.setColor("red");
//            product.setScore(4.0);
//            product.setDescription("satchel with zipper closure");
//
//            productService.createProduct(product);
//        }
        ArrayList<String> name = new ArrayList<String>();
        name.add("Large Blue Bag");
        name.add("Large White Bag");
        name.add("Large Black Bag");
        ArrayList<String> link = new ArrayList<String>();
        link.add("https://www.katespade.com/products/margaux-large-satchel/PXRUA160.html?dwvar_PXRUA160_color=399");
        link.add("https://www.katespade.com/products/margaux-jeweled-large-satchel/098687377393.html");
        link.add("https://www.katespade.com/products/margaux-jeweled-large-satchel/PXRUA350.html?dwvar_PXRUA350_size=U&dwvar_PXRUA350_color=429");
        ArrayList<String> color = new ArrayList<String>();
        color.add("blue");
        color.add("white");
        color.add("black");

        for (int i = 1; i < 4; i++) {
            Product product = new Product();
            product.setProductId(i);
            product.setCategoryId(1);
            product.setName(name.get(i - 1));
            product.setPrice(358.0);
            product.setImageLink(link.get(i - 1));
            product.setPostDate(new GregorianCalendar(2019, Calendar.APRIL, 29).getTime());
            product.setColor(color.get(i - 1));
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
            productCategory.setParentCategoryId(null);
            productCategoryService.createProductCategory(productCategory);
        }
    }
}
