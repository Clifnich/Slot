package com.puzhen.slot.main;

import junit.framework.Test;
import junit.framework.TestSuite;

public class RunAllTests {

	public static Test suite() {
		TestSuite suite = new TestSuite("RunAllTests");
		suite.addTestSuite(DialogContainerTest.class);
		suite.addTestSuite(DialogTest.class);
		return suite;
	}
}
