package com.chasecarlson.openinventory.server.model;


import com.chasecarlson.openinventory.server.api.error.ItemNotFoundException;
import com.chasecarlson.openinventory.server.service.ItemService;
import com.chasecarlson.openinventory.server.service.ItemServiceImpl;


import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name="parent", nullable = false)
	private long parent = 0;

	@Column(name="title")
	private String title;

	@Column(name="afield")
	private String afield;

	@Column(name="description")
	private String description;

	@Column(name="quantity", nullable = false)
	private int quantity = 1;

	@Column(name="upc")
	private String upc;

	public Item() {}

	public Item(String title, String description) {
		this.title = title;
		this.description = description;
	}

	public long getId() { return id; }

	public long getParent() { return parent; }

	public void setParent(long parent) { this.parent = parent; }

	public String getTitle() { return title; }

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getUpc() {
		return upc;
	}

	public void setUpc(String upc) {
		this.upc = upc;
	}

	public static String generateRandomId() {
		return UUID.randomUUID().toString().replace("-", "");
	}


}
