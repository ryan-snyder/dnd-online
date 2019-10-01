# Endpoints for node.js backend api

## Character creation endpoint

**Should only create a character in the db on a save**

**We could have temp characters though, for sharing purposes**


GET/POST /character/new or /character This endpoint will return the basic template for a new character 
**Note this may not be neccesary**

PUT /character - this endpoint will save a character in the db. We should pass in an accountId, characterId, and the character data

POST /character/{id} - this endpoint will get a character that is owned by the retriever

UPDATE /character/{id} - this endpoint will update the character info

DELETE /character/{id] - self explanitory. This endpoint will delete a character

## User endpoints

POST /user - endpoint to add a new user to the db

POST /user/character - return all characters for that user

DELETE /user/{id} - delete user completely - including characters/etc...

POST /user/party - return all parties this user belongs too


## Party endpoints

PUT /party - create a new party for a user and generate an invite link

POST /party - add a user and their character to the party

POST /party/{id} - get info on a party. Depending on who is accessing this, return different info

POST /party/{id}/{memberId} - get/add info about a specific party member: This can include notes, stat changes, etc

Permission levels for party:
Admin - the creator of the party: Normally a DM

Member - A member of the party - There may be instances that a party member can see certain info. That may be decided by the DM. Or that member will have a note section for info that they learn

We could have a party specific endpoint for character info.

Reason for this would be that the party members shouldn't be privy to all info on a character


# Business Rules/Logic

1. A character is a created DND character sheet
2. A character can be in multiple parties
3. A character that is in a party is independent from other characters (This means that any health, stat, or equipment changes only applies to that character in that party)
4. A user can have multiple characters in multiple parties
5. A user can create parties
6. A user can delete characters
7. A user can update characters
8. A user can share characters
9. A user can copy a character
