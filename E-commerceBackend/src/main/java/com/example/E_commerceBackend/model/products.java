package com.example.E_commerceBackend.model;

import java.util.Arrays;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class products {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String imgsrc;
	String title;
	String description;
	String price;
	String type;
	String[] features;
	String[] pros;
	String[] cons;
	boolean isdeleted;
	public boolean isIsdeleted() {
		return isdeleted;
	}
	public void setIsdeleted(boolean isdeleted) {
		this.isdeleted = isdeleted;
	}
	public String[] getPros() {
		return pros;
	}
	public void setPros(String[] pros) {
		this.pros = pros;
	}
	public String[] getCons() {
		return cons;
	}
	public void setCons(String[] cons) {
		this.cons = cons;
	}
	public String[] getFeatures() {
		return features;
	}
	public void setFeatures(String[] features) {
		this.features = features;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getImgsrc() {
		return imgsrc;
	}
	public void setImgsrc(String imgsrc) {
		this.imgsrc = imgsrc;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Override
	public String toString() {
		return "products [id=" + id + ", imgsrc=" + imgsrc + ", title=" + title + ", description=" + description
				+ ", price=" + price + ", type=" + type + ", features=" + Arrays.toString(features) + ", pros="
				+ Arrays.toString(pros) + ", cons=" + Arrays.toString(cons) + ", isdeleted=" + isdeleted + "]";
	}
	
}
