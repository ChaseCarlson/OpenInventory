package com.chasecarlson.openinventory.server.service;

import com.chasecarlson.openinventory.server.ServerApplication;
import com.chasecarlson.openinventory.server.api.error.ItemNotFoundException;
import com.chasecarlson.openinventory.server.model.Item;
import com.chasecarlson.openinventory.server.repository.ItemRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

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
		// Delete the item's descendants so we don't have any orphaned items
		ServerApplication.logger.info("Deleting item: {}", item.getTitle());
		List<Item> children = getItemsByParent(item.getId());
		for (Item childItem : children)
		{
			deleteItem(childItem);
		}
		// Delete the item itself
		repository.delete(item);
	}
}
