package com.chasecarlson.openinventory.server.service;

import com.chasecarlson.openinventory.server.api.error.ItemNotFoundException;
import com.chasecarlson.openinventory.server.model.Item;
import com.chasecarlson.openinventory.server.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	private ItemRepository repository;

	@Override
	public Item getItem(long id) {
		Item item = repository.findById(id);
		if (item == null && id != 0) {
			throw new ItemNotFoundException(id);
		}
		return item;
	}

	@Override
	public List<Item> getItemsByParent(long parent) {
		return repository.findByParentOrderByTitle(parent);
	}

	@Override
	public Item saveItem(Item item) {
		this.getItem(item.getParent()); // Allows for getItem to run a parent check
		return repository.save(item);
	}

	@Override
	public void deleteItem(Item item) {
		repository.delete(item);
	}
}
