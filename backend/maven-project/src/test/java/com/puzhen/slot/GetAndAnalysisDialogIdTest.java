package com.puzhen.slot;

import junit.framework.TestCase;

import java.io.*;
import java.net.*;
import javax.json.Json;
import javax.json.JsonObject;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.puzhen.slot.utility.Networks;

public class GetAndAnalysisDialogIdTest extends TestCase {

	public GetAndAnalysisDialogIdTest(String name) {
		super(name);
	}

	public void test0() {
		// create a dialog on server
		String weekdayLine = "0101010";
		int startTime = 8, endTime = 20, numOfMembers = 2;
		JsonObject obj = Json.createObjectBuilder()
				.add("weekdayLine", weekdayLine)
				.add("startTime", startTime)
				.add("endTime", endTime)
				.add("numOfMembers", numOfMembers)
				.add("leaderDrawStatus", "01010101").build();
		String dialogId = null;
		try {
			HttpURLConnection conn = (HttpURLConnection) (new URL("http://localhost:8082/Slot/dialog")).openConnection();
			conn.setDoInput(true);
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			PrintWriter writer = new PrintWriter(conn.getOutputStream());
			writer.write(obj.toString()); writer.flush();
			dialogId = Networks.exhaustBr(new BufferedReader(new InputStreamReader(conn.getInputStream())));
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
		
		// use this dialog id to get the Dialog object
		try {
			HttpURLConnection conn = (HttpURLConnection) (new URL("http://localhost:8082/Slot/dialog?id=" + dialogId)).openConnection();
			conn.setDoInput(true);
			String jsonString = Networks.exhaustBr(new BufferedReader(new InputStreamReader(conn.getInputStream())));
			JSONObject obj1 = (JSONObject) (new JSONParser()).parse(jsonString);
			assertEquals(weekdayLine, obj1.get("weekdayLine"));
			assertEquals(startTime, Integer.valueOf((String) obj1.get("startTime")).intValue());
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
}
