package com.example.E_commerceBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.E_commerceBackend.model.products;
import com.example.E_commerceBackend.service.DBService;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin
@RestController
public class homeController {
	
	@Autowired
	DBService service;
	
    public DBService getService() {
		return service;
	}

	public void setService(DBService service) {
		this.service = service;
	}

	@GetMapping("/")
    public String getMethodName() {
        return "Hello from homecontroller is working";
    }
    
    @GetMapping("/show")
    public List<products> getProducts(){
        return service.getProducts();
    }
    
    @PutMapping("/update/{id}")
    public products putMethodName(@PathVariable String id, @RequestBody products p) {
        return service.updateProduct(p,id);
    }
    
    @PostMapping("/add")
    public products postMethodName(@RequestBody products p) {
    	return service.addProduct(p);
    }
    
    @DeleteMapping("/delete/{id}")
    public String deleteMethodName(@PathVariable String id)
    {
    	return service.deleteProduct(id);
    }
    
 }
    
