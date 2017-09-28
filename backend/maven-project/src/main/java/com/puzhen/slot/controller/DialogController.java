package com.puzhen.slot.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DialogController {

	static final Logger logger = Logger.getLogger(DialogController.class);
	
//	@RequestMapping(value = "/createDialog", method = RequestMethod.POST, 
//			params = {"leaderId"}, consumes = "application/json")
//	@ResponseBody
//	public String doPost(@RequestBody LeaderRequestModel request, HttpServletResponse response,
//			@RequestParam (value = "leaderId") String leaderId) {
////		JSONObject obj = null;
////		try {
////			BufferedReader rd = new BufferedReader(new InputStreamReader(request.getInputStream()));
////			String requestJson = Networks.exhaustBr(rd);
////			obj = (JSONObject) (new JSONParser()).parse(requestJson);
////			if (!obj.containsKey("weekdayLine")
////					|| !obj.containsKey("startTime")
////					|| !obj.containsKey("endTime")
////					|| !obj.containsKey("numOfMembers")
////					|| !obj.containsKey("leaderDrawStatus")) {
////				response.setStatus(400);
////				return "no enough parameters";
////			}
////		} catch (Exception e) {
////			e.printStackTrace();
////			response.setStatus(500);
////			return "exception";
////		}
//		logger.info(request);
//		// TODO instead of randomly generate a string, put the dialog object
//		// into DialogContainer and let it return a dialogId.
//		RandomStringGenerator generator = new RandomStringGenerator.Builder()
//			     .withinRange('a', 'z').build();
//		String dialogId = generator.generate(20);
//		return dialogId;
//	}
	
	@RequestMapping(value = "/dialog", method = RequestMethod.GET, params = {"id", "userId"})
	public void doGetDialog(@RequestParam (value = "id") String id,
			@RequestParam (value = "userId") String userId) {
		
	}
}
