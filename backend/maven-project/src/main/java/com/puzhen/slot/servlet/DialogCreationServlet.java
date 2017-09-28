package com.puzhen.slot.servlet;

import javax.servlet.http.*;
import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import com.puzhen.slot.utility.Networks;
import java.io.*;

public class DialogCreationServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -9067671537266136250L;

	/**
	 * URL for this method is /createDialog?leaderId=xxxx
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws IOException {
		PrintWriter out = response.getWriter();
		JSONObject obj = null;
		try {
			BufferedReader rd = new BufferedReader(new InputStreamReader(request.getInputStream()));
			String requestJson = Networks.exhaustBr(rd);
			obj = (JSONObject) (new JSONParser()).parse(requestJson);
			if (!obj.containsKey("weekdayLine")
					|| !obj.containsKey("startTime")
					|| !obj.containsKey("endTime")
					|| !obj.containsKey("numOfMembers")
					|| !obj.containsKey("leaderDrawStatus")) {
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
		out.print("Success!");
	}
}
