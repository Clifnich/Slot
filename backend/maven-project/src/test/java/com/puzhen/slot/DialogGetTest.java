package com.puzhen.slot;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.json.Json;
import javax.json.JsonObject;
import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.puzhen.slot.utility.Networks;

import junit.framework.TestCase;

/**
 * This test suite tests the request
 * GET /dialog?id=xxx&userId=xxx
 * Get a JSON from server
 * @author puqian
 *
 */
public class DialogGetTest extends TestCase {

	private static final String urlHead = Contract.urlHead;
	
	static final Logger logger = Logger.getLogger(DialogGetTest.class);
	
	public DialogGetTest(String name) {
		super(name);
	}

	/**
	 * 1. create a dialog as a leader
	 * 2. get the dialog status from server, assert that the drawStatus is your availability
	 */
	public void test0() {
		// create a dialog as a leader
		String availability = "0111";
		String dialogId = null;
		JsonObject obj = Json.createObjectBuilder()
				.add("weekdayLine", "0101010")
				.add("startTime", 8)
				.add("endTime", 20)
				.add("numOfMembers", 2)
				.add("leaderDrawStatus", availability)
				.add("leader", "puzhen").build();
		try {
			HttpURLConnection conn = Networks.postToUrl(urlHead + "/createDialog", obj);
			dialogId = Networks.getResponseFromHttpConnection(conn);
		} catch (IOException e) {
			e.printStackTrace();
			fail();
		}
		if (dialogId == null) fail("fail to get dialogId");
		logger.info("dialogId got here is: " + dialogId);
		// get the dialog status from server, assert that the drawStatus is your availability
		StringBuffer getUrl = new StringBuffer();
		getUrl.append(urlHead + "/dialog?id=");
		getUrl.append(dialogId);
		getUrl.append("&userId=puzhen");
		try {
			HttpURLConnection conn = (HttpURLConnection) 
					(new URL(getUrl.toString())).openConnection();
			conn.setDoInput(true);
			String jsonString = Networks.getResponseFromHttpConnection(conn);
			JSONObject jsonObj = (JSONObject) (new JSONParser()).parse(jsonString);
			assertTrue(((String) jsonObj.get("drawStatus")).startsWith(availability));
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
}
