package com.puzhen.slot.main;

import java.util.*;
import org.apache.commons.text.RandomStringGenerator;
import org.json.simple.JSONObject;

import com.puzhen.slot.model.*;

public class DialogContainer {

	public synchronized String createDialog(JSONObject obj) {
		RandomStringGenerator generator = new RandomStringGenerator.Builder()
			     .withinRange('a', 'z').build();
		String dialogId = generator.generate(20);
		Dialog dialog = new Dialog(obj);
		dialogs.put(dialogId, dialog);
		return dialogId;
	}
	
	public Dialog getDialog(String dialogId) {
		return dialogs.get(dialogId);
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
