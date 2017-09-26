package com.puzhen.slot.trial;

import java.io.*;
import java.net.*;

import com.puzhen.slot.test.Networks;

public class PlayURLConnection {

	public static void main0(String[] args) throws MalformedURLException, IOException {
		HttpURLConnection conn = (HttpURLConnection) (new URL("http://localhost:8082/Slot/hi")).openConnection();
		conn.setDoInput(true);
		String response = Networks.exhaustBr(new BufferedReader(new InputStreamReader(conn.getInputStream())));
		System.out.println(response);
	}
	
	public static void main(String[] args) throws MalformedURLException, IOException {
		HttpURLConnection conn = (HttpURLConnection) (new URL("http://localhost:8082/Slot/hi")).openConnection();
//		conn.setDoInput(true);
//		String response = Networks.exhaustBr(new BufferedReader(new InputStreamReader(conn.getInputStream())));
		System.out.println(conn.getResponseCode());
	}
}
