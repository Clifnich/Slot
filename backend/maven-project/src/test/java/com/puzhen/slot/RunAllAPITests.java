package com.puzhen.slot;

import junit.framework.*;

public class RunAllAPITests {

	public static Test suite() {
		TestSuite suite = new TestSuite("RunAllAPITests");
		suite.addTestSuite(CreateDialogPostTest.class);
		suite.addTestSuite(DialogGetTest.class);
		suite.addTestSuite(DialogPostTest.class);
		return suite;
	}
}
