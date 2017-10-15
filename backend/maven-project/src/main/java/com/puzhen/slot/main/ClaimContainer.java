package com.puzhen.slot.main;

import java.util.HashMap;
import java.util.Map;

public class ClaimContainer {
    private static ClaimContainer ourInstance = new ClaimContainer();

    public static ClaimContainer getInstance() {
        return ourInstance;
    }

    public static final String OK = "OK";
    public static final String DENY = "DENY";

    private DialogContainer dialogContainer = DialogContainer.getInstance();
    // The map below maps a dialogId to the number of its remaining claims
    private Map<String, Integer> dialogId2RemainingClaims;

    private ClaimContainer() {
        dialogId2RemainingClaims = new HashMap<>();
    }

    public String claim(String dialogId, String claimId) {
        if (dialogId2RemainingClaims.containsKey(dialogId)) {
            int remainingClaims = dialogId2RemainingClaims.get(dialogId);
            if (remainingClaims > 0) {
                dialogId2RemainingClaims.replace(dialogId, remainingClaims - 1);
                return OK;
            } else {
                return DENY;
            }
        } else {
            int remainingClaims = dialogContainer.getDialog(dialogId).getNumOfMembers() - 1;
            if (remainingClaims > 0) {
                dialogId2RemainingClaims.put(dialogId, remainingClaims - 1);
                return OK;
            } else {
                return DENY;
            }
        }
    }
}
