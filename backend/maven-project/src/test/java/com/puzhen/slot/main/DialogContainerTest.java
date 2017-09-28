package com.puzhen.slot.main;

import javax.json.Json;
import javax.json.JsonObject;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.puzhen.slot.model.Dialog;

import junit.framework.TestCase;

public class DialogContainerTest extends TestCase {

	
	public DialogContainerTest(String name) {
		super(name);
	}
	
	public void test0() {
		JsonObject obj0 = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("endTime", "20")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		JSONObject obj = null;
		try {
			obj = (JSONObject) (new JSONParser()).parse(obj0.toString());
		} catch (ParseException e) {
			e.printStackTrace();
			fail();
		}
		DialogContainer container = DialogContainer.getInstance();
		String dialogId = container.createDialog(obj);
		Dialog dialog = container.getDialog(dialogId);
		assertEquals(8, dialog.getStartTime());
		assertEquals(2, dialog.getNumOfMembers());
	}
	
	/**
	 * test draw status auto-fill
	 */
	public void test1() {
		JsonObject obj0 = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("endTime", "20")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		JSONObject obj = null;
		try {
			obj = (JSONObject) (new JSONParser()).parse(obj0.toString());
		} catch (ParseException e) {
			e.printStackTrace();
			fail();
		}
		DialogContainer container = DialogContainer.getInstance();
		String dialogId = container.createDialog(obj);
		Dialog dialog = container.getDialog(dialogId);
		int[] drawStatus = dialog.getColorStatus();
		assertEquals(39, drawStatus.length);
		assertEquals(0, drawStatus[0]);
		assertEquals(1, drawStatus[1]);
	}
	
	/**
	 * test that user array should have the leader 
	 */
	public void test2() {
		JsonObject obj0 = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("endTime", "20")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		JSONObject obj = null;
		try {
			obj = (JSONObject) (new JSONParser()).parse(obj0.toString());
		} catch (ParseException e) {
			e.printStackTrace();
			fail();
		}
		DialogContainer container = DialogContainer.getInstance();
		String dialogId = container.createDialog(obj);
		Dialog dialog = container.getDialog(dialogId);
		String[] users = dialog.getUserIds();
		assertEquals(2, users.length);
		assertEquals("puzhen", users[0]);
	}
}
