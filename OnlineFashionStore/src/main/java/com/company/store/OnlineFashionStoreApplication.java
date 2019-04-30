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
        ArrayList<String> name = new ArrayList<String>();
        name.add("Large Blue Bag");
        name.add("Large White Bag");
        name.add("Large Black Bag");
        ArrayList<String> link = new ArrayList<String>();
        link.add("https://katespade.insnw.net/KateSpade/PXRUA160_399?$large$");
        link.add("https://katespade.insnw.net/KateSpade/PXRUA350_104?$large$");
        link.add("https://katespade.insnw.net/KateSpade/PXRUA350_429?$large$");
        ArrayList<String> color = new ArrayList<String>();
        color.add("blue");
        color.add("white");
        color.add("black");

        for (int i = 0; i < 12; i++) {
            int k = i % 3;
            Product product = new Product();
            product.setProductId(i + 1);
            product.setCategoryId(1);
            product.setName(name.get(k));
            product.setPrice(358.0);
            product.setImageLink(link.get(k));
            product.setPostDate(new GregorianCalendar(2019, Calendar.APRIL, 29).getTime());
            product.setColor(color.get(k));
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
