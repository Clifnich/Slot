package com.puzhen.slot.servlet;

import javax.servlet.http.*;

import com.puzhen.slot.main.DialogContainer;
import com.puzhen.slot.main.UserContainer;
import com.puzhen.slot.model.Dialog;
import com.puzhen.slot.model.User;

import java.io.*;

public class DialogServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6662720727506449185L;

	/**
	 * URL: /dialog?dialogId=xxx&userId=xxx
	 * "id" means dialog ID and userId is an identifier for the user.
	 * Convention for userId is that leader of this dialog has "leader" as
	 * userId and members have "member[number]" where [number] is like 1,2...
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) {
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
			response.setStatus(500);
			return;
		}
		String dialogId = request.getParameter("dialogId");
		if (dialogId == null) {
			response.setStatus(400);
			out.print("You didn't specify dialogId");
			return;
		}
		Dialog dialog = DialogContainer.getInstance().getDialog(dialogId);
		out.print(dialog.stringify());
	}
	
	/**
	 * URL: /dialog?dialogId=xxx&userId=xxx&drawStatus=xxx
	 * This API lets one member of the dialog post their availability.
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		PrintWriter out = null;
		try {
			out = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
			response.setStatus(500);
			return;
		}
		String dialogId = request.getParameter("dialogId"),
				userId = request.getParameter("userId"),
				drawStatus = request.getParameter("drawStatus");
		if (dialogId == null || userId == null || drawStatus == null) {
			response.setStatus(400);
			out.print("You didn't specify enough parameters.");
			return;
		}
		
		Dialog dialog = DialogContainer.getInstance().getDialog(dialogId);
		userId = dialogId + " " + userId;
		User user = new User(userId, drawStatus);
		dialog.addUser(user);		
		UserContainer.getInstance().insertUser(user);
		out.print("Done");
	}
}
