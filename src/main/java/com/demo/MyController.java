package com.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyController {

	@RequestMapping("/adddata")
	public String request1()
	{
		 System.out.println("hello");
		 return "HellowWorld.jsp";
	}
}
