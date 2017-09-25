package com.puzhen.slot.controller;

import java.util.*;

import org.apache.commons.text.RandomStringGenerator;

import com.puzhen.slot.model.*;

public class DialogContainer {

	public String getNewDialog(String weekdayLine, int startTime, int endTime, int numOfMembers) {
		RandomStringGenerator generator = new RandomStringGenerator.Builder()
			     .withinRange('a', 'z').build();
		String dialogId = generator.generate(20);
		
		return "";
	}
	
	private DialogContainer() {
		dialogs = new HashMap<String, Dialog>();
	}
	
	public static DialogContainer getInstance() {
		if (instance == null)
			instance = new DialogContainer();
		return instance;
	}
	
	private static DialogContainer instance;
	private Map<String, Dialog> dialogs;
}
