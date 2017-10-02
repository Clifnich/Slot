package com.puzhen.slot;

import junit.framework.TestCase;

import java.io.*;
import java.net.*;
import javax.json.*;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.puzhen.slot.utility.Networks;

/**
 * Backend needs to support a POST request like this:
 * POST /dialog?id=xxx&userId=xxx&drawstatus=xxxx
 * This request is for the user to publish his availability
 * @author Puzhen Qian
 *
 */
public class DialogPostTest extends TestCase {

	public DialogPostTest(String name) {
		super(name);
	}

	/**
	 * This case actually covers all aspects of the backend.
	 * So it should be quite complex.
	 * step 1. create a dialog with empty leaderDrawStatus
	 * step 2. publish your availability as memeber1 (your userId)
	 * step 3. refresh the page, assert that drawStatus is your availability
	 */
	public void test0() {
		// step 1. create a dialog with empty leaderDrawStatus
		String urlString = Contract.urlHead + "/createDialog";
		String dialogId = null;
		try {
			HttpURLConnection conn = (HttpURLConnection) 
					(new URL(urlString)).openConnection();
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setDoInput(true);
			JsonObject obj = Json.createObjectBuilder()
					.add("weekdayLine", "0101010")
					.add("startTime", "8")
					.add("endTime", "20")
					.add("numOfMembers", "2")
					.add("leaderDrawStatus", "000")
					.add("leader", "puzhen").build();
			PrintWriter writer = new PrintWriter(conn.getOutputStream());
			writer.write(obj.toString()); writer.flush();
			dialogId = Networks.getResponseFromHttpConnection(conn);
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
		if (dialogId == null) fail("fail to get dialogId");
		
		// step 2. publish your availability as memeber1 (your userId)
		StringBuffer postUrl = new StringBuffer();
		postUrl.append(Contract.urlHead + "/dialog?dialogId=");
		postUrl.append(dialogId);
		String myAvailability = "011";
		postUrl.append("&userId=member1&drawStatus=");
		postUrl.append(myAvailability);
		try {
			HttpURLConnection conn = (HttpURLConnection) 
					(new URL(postUrl.toString())).openConnection();
			conn.setDoInput(true);
			conn.setRequestMethod("POST");
			// TODO set post, and write your request specifically
			String response = Networks.getResponseFromHttpConnection(conn);
			System.out.println("Response from /dialog post request is: " + response);
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
		
		// step 3. refresh the page, assert that drawStatus is your availability
		StringBuffer getUrl = new StringBuffer();
		getUrl.append(Contract.urlHead + "/dialog?dialogId=");
		getUrl.append(dialogId);
		getUrl.append("&userId=member1");
		try {
			HttpURLConnection conn = (HttpURLConnection) 
					(new URL(getUrl.toString())).openConnection();
			conn.setDoInput(true);
			String jsonString = Networks.getResponseFromHttpConnection(conn);
			JSONObject jsonObj = (JSONObject) (new JSONParser()).parse(jsonString);
			assertTrue(((String) jsonObj.get("drawStatus")).startsWith(myAvailability));
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	
}
