package com.puzhen.slot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DummyServlet {

	@RequestMapping(value = "/hi", method = RequestMethod.GET)
	@ResponseBody
	public String doGet() {
		return "hi";
	}
}
