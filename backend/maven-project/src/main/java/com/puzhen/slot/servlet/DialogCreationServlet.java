package com.puzhen.slot.servlet;

import javax.servlet.http.*;
import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.puzhen.slot.main.DialogContainer;

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
		
		try {
			BufferedReader rd = request.getReader();
			String line = "";
			StringBuffer sb = new StringBuffer();
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			JSONObject obj = (JSONObject) (new JSONParser()).parse(sb.toString());
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
			logger.info(obj.toString());
			out.print(DialogContainer.getInstance().createDialog(obj));
		} catch (IOException | ParseException e) {
			e.printStackTrace();
		}
		
	}
}
