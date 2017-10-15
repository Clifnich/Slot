package com.puzhen.slot.main;

import com.puzhen.slot.model.Dialog;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.Test;

import javax.json.Json;
import javax.json.JsonObject;

import static junit.framework.TestCase.fail;
import static org.junit.Assert.assertEquals;

public class ClaimContainerTest {

    ClaimContainer claimContainer = ClaimContainer.getInstance();

    @Test
    public void test0() {
        JsonObject obj0 = Json.createObjectBuilder()
                .add("weekdayLine", "0101010")
                .add("startTime", "8")
                .add("endTime", "20")
                .add("numOfMembers", "2")
                .add("leaderDrawStatus", "010")
                .add("leader", "puzhen").build();
        JSONObject obj = null;
        try {
            obj = (JSONObject) (new JSONParser()).parse(obj0.toString());
        } catch (ParseException e) {
            e.printStackTrace();
            fail();
        }
        DialogContainer container = DialogContainer.getInstance();
        String dialogId = container.createDialog(obj);
        assertEquals(ClaimContainer.OK,
                claimContainer.claim(dialogId, "claim1"));
        assertEquals(ClaimContainer.DENY,
                claimContainer.claim(dialogId, "claim2"));
    }
}
