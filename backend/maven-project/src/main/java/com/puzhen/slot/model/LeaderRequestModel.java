package com.puzhen.slot.model;

public class LeaderRequestModel {

	private String weekdayLine;
	private int startTime;
	private int endTime;
	private int numOfMembers;
	private String leaderDrawStatus;
	public LeaderRequestModel(String weekdayLine, int startTime, int endTime, int numOfMembers,
			String leaderDrawStatus) {
		super();
		this.weekdayLine = weekdayLine;
		this.startTime = startTime;
		this.endTime = endTime;
		this.numOfMembers = numOfMembers;
		this.leaderDrawStatus = leaderDrawStatus;
	}
	
	public LeaderRequestModel() {
		
	}
	
	@Override
	public String toString() {
		return "LeaderRequestModel [weekdayLine=" + weekdayLine + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", numOfMembers=" + numOfMembers + ", leaderDrawStatus=" + leaderDrawStatus + "]";
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
	public String getLeaderDrawStatus() {
		return leaderDrawStatus;
	}
	public void setLeaderDrawStatus(String leaderDrawStatus) {
		this.leaderDrawStatus = leaderDrawStatus;
	}
}
