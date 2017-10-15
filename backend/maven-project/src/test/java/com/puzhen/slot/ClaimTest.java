package com.puzhen.slot;

import com.puzhen.slot.utility.Networks;
import org.junit.BeforeClass;
import org.junit.Test;

import javax.json.Json;
import javax.json.JsonObject;
import java.io.IOException;
import java.net.HttpURLConnection;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.fail;

public class ClaimTest {

    static String dialogId;

    @BeforeClass
    public static void configure() {
        String availability = "0111";
        JsonObject obj = Json.createObjectBuilder()
                .add("weekdayLine", "0101010")
                .add("startTime", "8")
                .add("endTime", "20")
                .add("numOfMembers", "2")
                .add("leaderDrawStatus", availability)
                .add("leader", "puzhen").build();
        try {
            HttpURLConnection conn = Networks.postToUrl(Contract.urlHead
                    + "/createDialog", obj);
            dialogId = Networks.getResponseFromHttpConnection(conn);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void claimTest() {
        try {
            assertEquals("OK", Networks.connect("GET",
                    Contract.urlHead + "/claim?dialogId=" + dialogId + "&claimId=123"));
            assertEquals("DENY", Networks.connect("GET",
                    Contract.urlHead + "/claim?dialogId=" + dialogId + "&claimId=123"));
        } catch (Exception e) {
            fail();
            e.printStackTrace();
        }
    }
}
