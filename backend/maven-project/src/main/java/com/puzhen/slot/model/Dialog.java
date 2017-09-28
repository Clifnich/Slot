package com.puzhen.slot.model;

import javax.json.JsonObject;

public class Dialog {

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public void setColorStatus(int[] colorStatus) {
		this.colorStatus = colorStatus;
	}
	
	public Dialog(JsonObject obj) {
		weekdayLine = obj.getString("weekdayLine");
		startTime = obj.getInt("startTime");
		endTime = obj.getInt("endTime");
		numOfMembers = obj.getInt("numOfMembers");
		userIds = new String[numOfMembers];
		setColorStatus(obj.getString("leaderDrawStatus"));
		setLeader(obj.getString("leader"));
		userIds[0] = leader;
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
	
	public String[] getUserIds() {
		return userIds;
	}
	public void setUserIds(String[] userIds) {
		this.userIds = userIds;
	}
	
	public String getLeader() {
		return leader;
	}
	
	public void setLeader(String leader) {
		this.leader = leader;
	}
	
	private String id;
	private String weekdayLine;
	private String leader;
	private int startTime;
	private int endTime;
	private int numOfMembers;
	private int[] colorStatus;
	private String[] userIds;
}
