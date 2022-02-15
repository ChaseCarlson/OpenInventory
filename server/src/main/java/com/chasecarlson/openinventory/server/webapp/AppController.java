package com.chasecarlson.openinventory.server.webapp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/")
@Controller
public class AppController {
	@GetMapping("/")
	public RedirectView appRedirect(RedirectAttributes attributes) {
		return new RedirectView("/app");
	}

	@RequestMapping("/app/**")
	public String getIndex(HttpServletRequest request) {
		return "/webapp/index.html";
	}

}
