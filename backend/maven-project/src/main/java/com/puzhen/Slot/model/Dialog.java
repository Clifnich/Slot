package com.puzhen.Slot.model;

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
	public String[] getUserIds() {
		return userIds;
	}
	public void setUserIds(String[] userIds) {
		this.userIds = userIds;
	}
	private String id;
	private String weekdayLine;
	private int startTime;
	private int endTime;
	private int numOfMembers;
	private int[] colorStatus;
	private String[] userIds;
}
