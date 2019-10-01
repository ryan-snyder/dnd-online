# Featherjs Services and appropiate methods

**For services: featherjs provides default methods that should handle the majority of cases**

**Any method that will override will have additional explaniation**

## Character service

**Should only create a character in the db on a save**

**We could have temp characters though, for sharing purposes**
Create character - create character for the current user
find character - find character owned by current user with whatever query params
Update character
Delete character
Get character

### Character object/model
* Character
  * Class
  * Level
  * Race
  * Stats
  * Health
  * Actions
  * Spells (if any)
  * Equipment/loot
* the user that owns it

Not sure how to get/update indivdual character info
Should we just pass in the complete character with whatever was updated?
Will have to think about this. Not sure the level of granularity that featherjs allows

## User service
Create user - create a user
Delete user
Update user
Get user

## Party service
Create party - create a party for the current user. Pass in name and generate link
Delete party
Edit party
Get party
find party - find party owned by or containing current user with whatever query params

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


## Thoughts

Does a character have to be in a party in order to track stats?
How easy should it be to create a character and just track stats? We don't want a user to have to go through a bunch of hoops in order to do so.

More thoughts to come....
