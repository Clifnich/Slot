package com.puzhen.slot.model;

public class User {

	public String getId() {
		return userId;
	}
	public void setId(String id) {
		this.userId = id;
	}
	public int[] getDrawStatus() {
		return drawStatus;
	}
	public void setDrawStatus(int[] drawStatus) {
		this.drawStatus = drawStatus;
	}
	
	public User(String userId, String drawStatus) {
		this.userId = userId;
		this.drawStatus = new int[drawStatus.length()];
		for (int i = 0; i < drawStatus.length(); i++)
			this.drawStatus[i] = drawStatus.charAt(i) - '0';
	}
	
	/** userId is "[dialogId] [shortUserId]" where shortUserId is like leader, member1.. etc */
	private String userId;
	private int[] drawStatus;
}
