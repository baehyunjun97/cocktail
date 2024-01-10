package com.kh.app.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("home")
	public String showHome() {
		System.out.println("dddddd");
		return "home";
	}
	
}
