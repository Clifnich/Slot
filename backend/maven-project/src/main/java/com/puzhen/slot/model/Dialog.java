package com.puzhen.slot.model;

import java.util.*;

import javax.json.Json;
import javax.json.JsonObject;

import org.json.simple.JSONObject;

public class Dialog {

	public String getId() {
		return dialogId;
	}
	public void setId(String id) {
		this.dialogId = id;
	}
	public String getWeekdayLine() {
		return weekdayLine;
	}
	public void setWeekdayLine(String weekdayLine) {
		this.weekdayLine = weekdayLine;
	}
	public int getStartTime() {
		return startTime;
	}
	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}
	public int getEndTime() {
		return endTime;
	}
	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}
	public int getNumOfMembers() {
		return numOfMembers;
	}
	public void setNumOfMembers(int numOfMembers) {
		this.numOfMembers = numOfMembers;
	}
	public int[] getColorStatus() {
		return colorStatus;
	}

	
	public Dialog(JSONObject obj) {
		weekdayLine = (String) obj.get("weekdayLine");
		startTime = Integer.valueOf((String) obj.get("startTime"));
		endTime = Integer.valueOf((String) obj.get("endTime"));
		numOfMembers = Integer.valueOf((String) obj.get("numOfMembers"));
		shortUserIds = new String[1];
		setColorStatus((String)obj.get("leaderDrawStatus"));
		setLeader((String) obj.get("leader"));
		shortUserIds[0] = leader;
	}
	
	public void setColorStatus(String colorStatus) {
		int weekdayCount = 0;
		for (int i = 0; i < weekdayLine.length(); i++) {
			char c = weekdayLine.charAt(i);
			if (c == '1') weekdayCount++;
		}
		this.colorStatus = new int[(endTime - startTime + 1) * weekdayCount];
		for (int i = 0; i < colorStatus.length(); i++) {
			this.colorStatus[i] = colorStatus.charAt(i) - '0';
		}
	}
	
	public void addUser(User user) {
		String shortUserId = user.getId().split(" ")[1];
		List<String> userList = new ArrayList<String>();
		for (String id : shortUserIds)
			userList.add(id);
		userList.add(shortUserId);
		shortUserIds = userList.toArray(shortUserIds);
		
		// add user's draw status to the dialog's
		int[] userDrawStatus = user.getDrawStatus();
		for (int i = 0; i < userDrawStatus.length; i++)
			colorStatus[i] += userDrawStatus[i];
	}
	
	public String[] getUserIds() {
		return shortUserIds;
	}
	public void setUserIds(String[] userIds) {
		this.shortUserIds = userIds;
	}
	
	public String getLeader() {
		return leader;
	}
	
	public void setLeader(String leader) {
		this.leader = leader;
	}
	
	public String stringify() {
		StringBuffer drawStatus = new StringBuffer();
		for (int i = 0; i < colorStatus.length; i++)
			drawStatus.append(colorStatus[i]);
		JsonObject obj = Json.createObjectBuilder()
				.add("weekdayLine", weekdayLine)
				.add("startTime", String.valueOf(startTime))
				.add("endTime", String.valueOf(endTime))
				.add("numOfMembers", String.valueOf(numOfMembers))
				.add("drawStatus", drawStatus.toString()).build();
		return obj.toString();
	}
	
	private String dialogId;
	private String weekdayLine;
	private String leader;
	private int startTime;
	private int endTime;
	private int numOfMembers;
	private int[] colorStatus;
	private String[] shortUserIds;
}
