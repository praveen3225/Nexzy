package com.example.E_commerceBackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.E_commerceBackend.model.products;
import com.example.E_commerceBackend.repo.DBrepo;

@Service
public class DBService{
	@Autowired
	DBrepo repo;

	public DBrepo getRepo() {
		return repo;
	}

	public void setRepo(DBrepo repo) {
		this.repo = repo;
	}

	public List<products> getProducts() {
		return repo.findAll();
	}

	public products addProduct(products p) {
		repo.save(p);
		return p;
	}

	public products updateProduct(products p, String id) {
		Optional<products> temp = repo.findById(Integer.parseInt(id));
		if(temp.isPresent())
		{
			products updatetemp = temp.get();
			updatetemp.setImgsrc(p.getImgsrc());
			updatetemp.setCons(p.getCons());
			updatetemp.setFeatures(p.getFeatures());
			updatetemp.setDescription(p.getDescription());
			updatetemp.setPros(p.getPros());
			updatetemp.setPrice(p.getPrice());
			updatetemp.setTitle(p.getTitle());
			updatetemp.setType(p.getType());
			updatetemp.setIsdeleted(p.isIsdeleted());
			repo.save(updatetemp);
		}
		return temp.get();
	}

	public String deleteProduct(String id) {
		repo.deleteById(Integer.parseInt(id));
		return "Delete done successful";
	}
	
	

}
