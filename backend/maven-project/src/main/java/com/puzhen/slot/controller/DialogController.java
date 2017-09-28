package com.puzhen.slot.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;

import org.apache.commons.text.RandomStringGenerator;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.puzhen.slot.utility.Networks;

@Controller
public class DialogController {

	@RequestMapping(value = "/createDialog", method = RequestMethod.POST, params = {"leaderId"})
	@ResponseBody
	public String doPost(HttpServletRequest request, HttpServletResponse response,
			@RequestParam (value = "leaderId") String leaderId) {
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
				return "no enough parameters";
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			return "exception";
		}
		// TODO instead of randomly generate a string, put the dialog object
		// into DialogContainer and let it return a dialogId.
		RandomStringGenerator generator = new RandomStringGenerator.Builder()
			     .withinRange('a', 'z').build();
		String dialogId = generator.generate(20);
		return dialogId;
	}
	
	@RequestMapping(value = "/dialog", method = RequestMethod.GET, params = {"id", "userId"})
	public void doGetDialog(@RequestParam (value = "id") String id,
			@RequestParam (value = "userId") String userId) {
		
	}
}
