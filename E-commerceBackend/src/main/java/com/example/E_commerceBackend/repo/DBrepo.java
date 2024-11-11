package com.example.E_commerceBackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.E_commerceBackend.model.products;

@Repository
public interface DBrepo extends JpaRepository<products, Integer> {

	
}
