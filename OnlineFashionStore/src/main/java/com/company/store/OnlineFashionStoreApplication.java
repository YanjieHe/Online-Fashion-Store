package com.company.store;

import com.company.store.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.company.store.dao.ProductDao;

import java.util.Calendar;
import java.util.GregorianCalendar;


@SpringBootApplication
public class OnlineFashionStoreApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(OnlineFashionStoreApplication.class, args);
	}

	@Autowired
	ProductDao productDao;

	@Override
	public void run(String... strings) throws Exception {
		Product product = new Product();
		product.setProductId(1);
		product.setCategoryId(10);
		product.setName("Bag");
		product.setPrice(890.0);
		product.setImageLink("https://katespade.insnw.net/KateSpade/PXRUA160_399_1?$large$");
		product.setPostDate(new GregorianCalendar(2019, Calendar.APRIL, 1).getTime());
		product.setColor("red");
		product.setScore(4.0);
		product.setDescription("satchel with zipper closure");

		productDao.createProduct(product);
	}

}
