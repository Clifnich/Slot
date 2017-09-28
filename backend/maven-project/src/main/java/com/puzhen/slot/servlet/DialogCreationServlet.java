package com.puzhen.slot.servlet;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonValue;
import javax.servlet.http.*;

import org.apache.log4j.Logger;
import org.json.simple.*;
import org.json.simple.parser.JSONParser;

import com.puzhen.slot.main.DialogContainer;
import com.puzhen.slot.utility.Networks;
import java.io.*;

public class DialogCreationServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -9067671537266136250L;
	
	private static final Logger logger = Logger.getLogger(DialogCreationServlet.class);

	/**
	 * URL for this method is /createDialog
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response){
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e1) {
			e1.printStackTrace();
			response.setStatus(500);
			return;
		}
		JSONObject obj = null;
		try {
			BufferedReader rd = new BufferedReader(new InputStreamReader(request.getInputStream()));
			String requestJson = Networks.exhaustBr(rd);
			logger.info("requestJson is: [" + requestJson + "].");
			obj = (JSONObject) (new JSONParser()).parse(requestJson);
			if (!obj.containsKey("weekdayLine")
					|| !obj.containsKey("startTime")
					|| !obj.containsKey("endTime")
					|| !obj.containsKey("numOfMembers")
					|| !obj.containsKey("leaderDrawStatus")
					|| !obj.containsKey("leader")) {
				response.setStatus(400);
				out.print("no enough parameters");
				return;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			out.print("exception");
			return;
		}
		JsonObject obj2 = Json.createObjectBuilder()
				.add("weekdayLine", (JsonValue) obj.get("weekdayLine"))
				.add("startTime", (JsonValue) obj.get("startTime"))
				.add("endTime", (JsonValue) obj.get("endTime"))
				.add("numOfMembers", (JsonValue) obj.get("numOfMembers"))
				.add("leaderDrawStatus", (JsonValue) obj.get("leaderDrawStatus"))
				.add("leader", (JsonValue) obj.get("leader"))
				.build();
		out.print(DialogContainer.getInstance().createDialog(obj2));
	}
}
