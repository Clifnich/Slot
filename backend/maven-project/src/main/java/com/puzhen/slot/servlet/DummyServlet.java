package com.puzhen.slot.servlet;

import javax.servlet.http.*;
import java.io.*;

public class DummyServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2641611805640816116L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		try {
			PrintWriter out = response.getWriter();
			out.print("Hello");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
