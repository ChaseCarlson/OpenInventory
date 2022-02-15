package com.chasecarlson.openinventory.server.service;

import com.chasecarlson.openinventory.server.model.Item;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService {
	Item getItem(long id);
	List<Item> getItemsByParent(long parent);
	Item saveItem(Item item);
	void deleteItem(Item item);
}
