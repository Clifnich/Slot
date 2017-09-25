package com.puzhen.slot.model;

public class User {

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int[] getDrawStatus() {
		return drawStatus;
	}
	public void setDrawStatus(int[] drawStatus) {
		this.drawStatus = drawStatus;
	}
	
	private String id;
	private int[] drawStatus;
}
