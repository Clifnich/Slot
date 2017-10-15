package com.puzhen.slot.main;

import junit.framework.Test;
import junit.framework.TestSuite;

/**
 * This class is deprecated.
 */
public class RunAllTests {

	public static Test suite() {
		TestSuite suite = new TestSuite("RunAllTests");
		suite.addTestSuite(DialogContainerTest.class);
		suite.addTestSuite(DialogTest.class);
		//suite.addTestSuite(ClaimContainerTest.class);
		return suite;
	}
}
