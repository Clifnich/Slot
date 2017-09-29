package com.puzhen.slot.main;

import javax.json.Json;
import javax.json.JsonObject;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import com.puzhen.slot.model.Dialog;
import com.puzhen.slot.model.User;

import junit.framework.TestCase;

public class DialogTest extends TestCase {

	public DialogTest(String name) {
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
			JSONParser parser = new JSONParser();
			obj = (JSONObject) parser.parse(obj0.toString());
			Dialog dialog = new Dialog(obj);
			JSONObject objFromDialog = (JSONObject) parser.parse(dialog.stringify());
//			System.out.println((String)objFromDialog.get("drawStatus"));
//			System.out.println(dialog.stringify());
			assertTrue(((String) objFromDialog.get("drawStatus")).startsWith("010"));
		} catch (ParseException e) {
			e.printStackTrace();
			fail();
		}
//		Dialog dialog = new Dialog(obj);
//		String drawStatus = (String) dialo
//		assertTrue()
	}
	
	/**
	 * Test addUser(shortUserID) method
	 */
	public void testAddUser() {
		JsonObject obj0 = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("endTime", "20")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		JSONObject obj = null;
		try {
			JSONParser parser = new JSONParser();
			obj = (JSONObject) parser.parse(obj0.toString());
			Dialog dialog = new Dialog(obj);
			dialog.addUser(new User("dialog0 member1", "010"));
			String[] userIds = dialog.getUserIds();
			assertEquals(2, userIds.length);
			assertEquals("member1", userIds[1]);
		} catch (ParseException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	/**
	 * Test that dialog.addUser() method correctly adds user's draw status
	 */
	public void testAddUser1() {
		JsonObject obj0 = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("endTime", "20")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		JSONObject obj = null;
		try {
			JSONParser parser = new JSONParser();
			obj = (JSONObject) parser.parse(obj0.toString());
			Dialog dialog = new Dialog(obj);
			dialog.addUser(new User("dialog0 member1", "010"));
			int[] colorStatus = dialog.getColorStatus();
			assertEquals(2, colorStatus[1]);
			assertEquals(0, colorStatus[0]);
		} catch (ParseException e) {
			e.printStackTrace();
			fail();
		}
	}
}
