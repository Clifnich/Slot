package com.puzhen.slot.servlet;

import com.puzhen.slot.main.ClaimContainer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ClaimServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        String dialogId = req.getParameter("dialogId"),
                claimId = req.getParameter("claimId");
        if (dialogId == null || claimId == null) {
            resp.setStatus(400);
            out.print("You didn't specify the right parameter.");
            return;
        } else {
            ClaimContainer claimContainer = ClaimContainer.getInstance();
            out.print(claimContainer.claim(dialogId, claimId));
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Get one request!");
    }
}
