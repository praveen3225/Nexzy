package com.example.E_commerceBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.E_commerceBackend.controller.homeController;
import com.example.E_commerceBackend.model.products;
import com.example.E_commerceBackend.repo.DBrepo;
import com.example.E_commerceBackend.service.DBService;

@SpringBootApplication
public class ECommerceBackendApplication {

	public static void main(String[] args) {
	  ApplicationContext context = SpringApplication.run(ECommerceBackendApplication.class, args);
	  DBrepo repo = context.getBean(DBrepo.class);
	  DBService service = context.getBean(DBService.class);
	  products obj = context.getBean(products.class);
	}

}
