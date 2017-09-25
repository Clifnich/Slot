package com.puzhen.slot.test;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
//import java.nio.file.*;

import javax.net.ssl.HttpsURLConnection;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/*
 * Keep this class as an infrastructure class.
 */
public class Networks {

	private static JSONParser parser = new JSONParser();
	private static final Logger logger = Logger.getLogger(Networks.class);

	/**
	 * This method connects to the server and request for JSON. By default this
	 * method uses HTTPS connection.
	 * 
	 * @param url
	 * @return JSONObject
	 * @throws Exception
	 *             about network and JSONParsing.
	 */
	public static JSONObject getJSONFromServer(String urlString) throws Exception {
		JSONObject obj = null;
		try {
			obj = (JSONObject) parser.parse(getStringFromServer(urlString));
		} catch (ParseException | IOException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			throw new Exception();
		}
		return obj;
	}

	/**
	 * This method downloads the JSON from given URL.
	 * 
	 * @param urlString
	 * @return JSON string from the server
	 * @throws IOException
	 */
	public static String getStringFromServer(String urlString) throws IOException {
//		try {
//		    Files.write(Paths.get("download_list.txt"), ("\n" + urlString).getBytes(), StandardOpenOption.APPEND);
//		}catch (IOException e) {
//		    //exception handling left as an exercise for the reader
//		}
		URL url = new URL(urlString);
		HttpURLConnection http = null;
		if (urlString.startsWith("https"))
			http = (HttpsURLConnection) url.openConnection();
		else
			http = (HttpURLConnection) url.openConnection();
		http.setRequestMethod("GET");
		http.setRequestProperty("Host", "jenkins.stubcorp.com");
		http.setRequestProperty("From", "puqian@ebay.com");
		http.setDoInput(true);

		BufferedReader rd = new BufferedReader(new InputStreamReader(http.getInputStream()));
		return exhaustBr(rd);
	}

	/**
	 * This method reads a JSON file and creates a JSON Object from it
	 * 
	 * @throws Exception
	 */
	public static JSONObject getJSONFromFile(String filepath) throws Exception {
		File file = new File(filepath);
		BufferedReader rd = new BufferedReader(new FileReader(file));
		String line = exhaustBr(rd);
		return (JSONObject) parser.parse(line);
	}

	/**
	 * This method reads everything from the BufferedReader object.
	 * 
	 * @param rd
	 * @return contents read from BufferedReader
	 * @throws IOException
	 */
	public static String exhaustBr(BufferedReader rd) throws IOException {
		StringBuffer sb = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			sb.append(line);
			sb.append("\n");
		}
		rd.close();
		return sb.toString();
	}

	/**
	 * Send a post request to a given URL
	 * 
	 * @param urlString
	 * @return
	 * @throws Exception
	 */
	public static String connect(String method, String urlString) throws Exception {
		HttpURLConnection conn = (HttpURLConnection) new URL(urlString).openConnection();
		conn.setRequestMethod(method);
		conn.connect();
		return Networks.exhaustBr(new BufferedReader(new InputStreamReader(conn.getInputStream())));
	}
}
