package com.chasecarlson.openinventory.server.repository;

import com.chasecarlson.openinventory.server.model.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {
	Item findById(long id);
	List<Item> findByParent(long parent);
	List<Item> findByParentOrderByTitle(long parent);
}
