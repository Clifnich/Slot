## Slot rules and milestones
### Rules
Rule #1. Once committed, no change allowed.
Rule #2. A leader can only have one dialog.
Rule #3. Leader can only send the dialog to a limited number of members.
Rule #4. Members can’t re-send the dialog.

### Milestones
Milestone 1. POST /createDialog with JSON as message body.
```
{
    "weekdayLine": "",
    "startTime": "",
    "endTime": "",
    "numOfMembers": "",
    "leaderDrawStatus": ""
}
```
This should return a dialog ID.

Milestone 2. GET /dialog?id=xxx&userId=xxx

Milestone 3. POST /dialog?id=xxx&userId=xxx&drawStatus=xxxx
Used for publishing a user's availability.