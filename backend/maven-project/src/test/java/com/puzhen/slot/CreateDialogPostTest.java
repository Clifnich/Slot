package com.puzhen.slot;

import javax.json.*;
import com.puzhen.slot.utility.Networks;

import junit.framework.TestCase;
import java.io.*;
import java.net.*;

public class CreateDialogPostTest extends TestCase {

	private static final String urlHead = Contract.urlHead;
	
	public CreateDialogPostTest(String name) {
		super(name);
	}
	
	/**
	 * Robustness test.
	 * A normal request should return 200 OK
	 */
	public void test0() {
		JsonObject obj = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("endTime", "20")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		try {
			HttpURLConnection conn = (HttpURLConnection) 
					(new URL(urlHead + "/createDialog")).openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json; charset=utf8");
			PrintWriter writer = new PrintWriter(conn.getOutputStream());
			writer.write(obj.toString()); writer.flush();
			assertEquals(200, conn.getResponseCode());
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	/**
	 * This test deliberately misses a parameter in Json,
	 * server should return 400 bad request
	 */
	public void test1(){
		JsonObject obj = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		try {
			HttpURLConnection conn = (HttpURLConnection)
					(new URL(urlHead + "/createDialog")).openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json; charset=utf8");
			PrintWriter writer = new PrintWriter(conn.getOutputStream());
			writer.write(obj.toString()); writer.flush();
			assertEquals(400, conn.getResponseCode());
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
	}
	
	public void testThatResponseIdIsString() {
		JsonObject obj = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", "8")
				.add("endTime", "20")
				.add("numOfMembers", "2")
				.add("leaderDrawStatus", "010")
				.add("leader", "puzhen").build();
		try {
			HttpURLConnection conn = (HttpURLConnection) 
					(new URL(urlHead + "/createDialog")).openConnection();
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json; charset=utf8");
			PrintWriter writer = new PrintWriter(conn.getOutputStream());
			writer.write(obj.toString()); writer.flush();
			String dialogId = Networks.getResponseFromHttpConnection(conn);
			System.out.println("[" + dialogId + "].");
			assertTrue(dialogId.length() > 0);
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
	}


	
}
