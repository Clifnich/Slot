package com.puzhen.Slot.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;

import org.apache.commons.text.RandomStringGenerator;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DialogController {

	@RequestMapping(value = "/createDialog", method = RequestMethod.POST)
	@ResponseBody
	public String doPost(HttpServletRequest request, HttpServletResponse response) {
		JSONObject obj = null;
		try {
			BufferedReader rd = new BufferedReader(new InputStreamReader(request.getInputStream()));
			StringBuffer sb = new StringBuffer();
			String line = "";
			boolean first = true;
			while ((line = rd.readLine()) != null) {
				if (first) {
					sb.append(line);
				} else {
					sb.append("\r\n");
					sb.append(line);
				}
			}
			obj = (JSONObject) (new JSONParser()).parse(sb.toString());
			if (!obj.containsKey("weekdayLine")
					|| !obj.containsKey("startTime")
					|| !obj.containsKey("endTime")
					|| !obj.containsKey("numOfMembers")
					|| !obj.containsKey("leaderDrawStatus")) {
				response.setStatus(400);
				return "no enough parameters";
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			return "exception";
		}
		
		RandomStringGenerator generator = new RandomStringGenerator.Builder()
			     .withinRange('a', 'z').build();
		String dialogId = generator.generate(20);
		return dialogId;
	}
	
//	@RequestMapping(value = "/createdialog", method = RequestMethod.POST)
//	@ResponseBody
//	public String createDialog() {
//		return "";
//	}
}
