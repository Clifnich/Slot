package com.puzhen.slot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.puzhen.slot.model.DummyModel;

@Controller
public class DummyServlet {

	@RequestMapping(value = "/hi", method = RequestMethod.GET)
	@ResponseBody
	public String doGet() {
		return "hi";
	}
	
	@RequestMapping(value = "/dummy", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String doPost(@RequestBody DummyModel dummy) {
		return "hi";
	}
	
	@RequestMapping(value = "/dummy", method = RequestMethod.GET)
	public @ResponseBody DummyModel doGetDummy() {
		DummyModel model = new DummyModel();
		model.setUsername("tom");
		model.setPassword("123");
		return model;
	}
}
