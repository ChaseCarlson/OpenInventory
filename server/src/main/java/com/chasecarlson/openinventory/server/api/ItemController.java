package com.chasecarlson.openinventory.server.api;

import com.chasecarlson.openinventory.server.api.error.ItemNotFoundException;
import com.chasecarlson.openinventory.server.model.Item;
import com.chasecarlson.openinventory.server.repository.ItemRepository;
import com.chasecarlson.openinventory.server.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/item")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

	@Autowired
	private ItemRepository repository;

	@Autowired
	private ItemService itemService;

	@GetMapping("/{uid}")
	public Item getItem(@PathVariable("uid") long uid) {
		return itemService.getItem(uid);
	}

	@GetMapping("/{uid}/children")
	public List<Item> getChildren(@PathVariable("uid") long uid) {
		return itemService.getItemsByParent(uid);
	}

	@PostMapping
	public Item add(@RequestBody Item newItem) {
		Item item = new Item();
		item.setParent(newItem.getParent());
		item.setTitle(newItem.getTitle());
		return itemService.saveItem(item);
	}

	@DeleteMapping("/{uid}")
	public void delete(@PathVariable("uid") long uid) {
		itemService.deleteItem(itemService.getItem(uid));
	}
}
