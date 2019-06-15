package com.company.store;

import com.company.store.models.Customer;
import com.company.store.models.Inventory;
import com.company.store.models.Product;
import com.company.store.models.ProductCategory;
import com.company.store.services.CustomerService;
import com.company.store.services.InventoryService;
import com.company.store.services.ProductCategoryService;
import com.company.store.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Random;


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
    InventoryService inventoryService;

    @Autowired
    CustomerService customerService;

    @Override
    public void run(String... strings) throws Exception {
        InsertProducts();
        InsertProductCategories();
        InsertUsers();
    }

    void InsertProducts() {
        ArrayList<String> name = new ArrayList<String>();
        name.add("Large Blue Bag");
        name.add("Large White Bag");
        name.add("Large Black Bag");
        name.add("tie-front dress");
        name.add("plaid tweed sleeveless dress");
        name.add("fluid suiting blazer");
        name.add("femme denim jacket");
        name.add("scallop textured sweater");
        name.add("garden posy smocked top");
        name.add("aaron sneakers");
        name.add("fallyn flats");
        name.add("jonah loafers");
        ArrayList<String> link = new ArrayList<String>();
        link.add("https://katespade.insnw.net/KateSpade/PXRUA160_399?$large$");
        link.add("https://katespade.insnw.net/KateSpade/PXRUA350_104?$large$");
        link.add("https://katespade.insnw.net/KateSpade/PXRUA350_429?$large$");
        link.add("https://katespade.insnw.net/KateSpade/NJMUA584_334?$large$");
        link.add("https://katespade.insnw.net/KateSpade/NJMUA572_558?$large$");
        link.add("https://katespade.insnw.net/KateSpade/NJMUA600_153?$large$");
        link.add("https://katespade.insnw.net/KateSpade/NJMUA525_174?$large$");
        link.add("https://katespade.insnw.net/KateSpade/NJMUA623_203?$large$");
        link.add("https://katespade.insnw.net/KateSpade/NJMUA545_203?$large$");
        link.add("https://katespade.insnw.net/KateSpade/S2120020_003?$large$");
        link.add("https://katespade.insnw.net/KateSpade/S2350001_104?$large$");
        link.add("https://katespade.insnw.net/KateSpade/S2261004_650?$large$");
        ArrayList<String> color = new ArrayList<String>();
        color.add("Blue");
        color.add("White");
        color.add("Black");
        color.add("Green");
        color.add("Bright Peony Mult");
        color.add("White");
        color.add("Nearly Nude");
        color.add("Caramel");
        color.add("Caramel");
        color.add("White");
        color.add("Tusk");
        color.add("Smoke Pale Pink");

        int[] categoryIdList = {
                1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3
        };

        String[] categoryList = {
                "Bag", "Bag", "Bag", "Clothing", "Clothing", "Clothing", "Clothing", "Clothing", "Clothing", "Shoe", "Shoe", "Shoe"
        };
        Random random = new Random();
        for (int i = 0; i < 12; i++) {
            int k = i % 3;
            Product product = new Product();
            product.setProductId(i + 1);
            product.setCategoryId(categoryIdList[i]);
            product.setCategory(categoryList[i]);
            product.setName(name.get(i));
            product.setPostDate(new GregorianCalendar(2019, Calendar.APRIL, 29).getTime());
            product.setScore(4.0);
            product.setDescription("satchel with zipper closure");
            productService.createProduct(product);

            Inventory inventory = new Inventory();
            inventory.setColor(color.get(k));
            inventory.setImageLink(link.get(i));
            inventory.setPrice((double) (Math.abs(random.nextInt()) % 900 + 100));
            inventory.setInventoryId(i + 1);
            inventory.setProductId(i + 1);
            inventory.setQuantity(10);
            inventory.setSize(Integer.toString((Math.abs(random.nextInt()) % 5 + 3) * 2));
            inventoryService.createInventory(inventory);
        }
    }

    void InsertProductCategories() {
        String[] categories = {
                "Bag", "Clothing", "Shoe",
        };
        for (int i = 1; i <= 3; i++) {
            ProductCategory productCategory = new ProductCategory();
            productCategory.setCategoryId(i);
            productCategory.setCategoryName(categories[i - 1]);
            productCategory.setParentCategoryId(null);
            productCategoryService.createProductCategory(productCategory);
        }
    }

    void InsertUsers() {
        Customer foo = new Customer();
        foo.setCustomerId(1);
        foo.setEmail("foo@gmail.com");
        foo.setPassword("1234");
        foo.setFirstName("Foo");
        foo.setLastName("A");
        customerService.createCustomer(foo);


        Customer bar = new Customer();
        bar.setCustomerId(2);
        bar.setEmail("bar@gmail.com");
        bar.setPassword("4321");
        bar.setFirstName("Bar");
        bar.setLastName("B");
        customerService.createCustomer(bar);
    }
}
