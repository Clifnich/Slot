package com.puzhen.slot.main;

import java.util.*;
import com.puzhen.slot.model.*;

public class UserContainer {

	private static UserContainer instance;
	private Map<String, User> userMap;
	
	private UserContainer() {
		userMap = new HashMap<String, User>();
	}
	
	public static UserContainer getInstance() {
		if (instance == null)
			instance = new UserContainer();
		return instance;
	}
	
	public void insertUser(User user) {
		userMap.put(user.getId(), user);
	}
	
	public User getUser(String userId) {
		return userMap.get(userId);
	}
	
}
