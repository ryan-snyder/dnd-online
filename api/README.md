# Featherjs Services and appropiate methods

**For services: featherjs provides default methods that should handle the majority of cases**

**Any method that will override will have additional explaniation**

## Character service

**Should only create a character in the db on a save**

**We could have temp characters though, for sharing purposes**

Create character - create character for the current user and update the user with the character id and so forth

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

Update user - Update the user

Get user

**Character Creation**
This will be the same as creating a party

1. Call an update on the user with the character info and from the user.class call character.create and then link the id to the user

^ this way, we can more easily link the character id to the user

## Party service
Create party - create a party for the current user. Pass in name and generate link using shortid. Link will be added to the database

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

## The reason behind the character/party creation logic 

The reason for designing it this way is that originally, my thought was that we would simply call the create call on character/party. 
And then in order to find the users character we would do a find call on character/party with the userId.

However, in my opinion, this will be inefficent and will not scale well. So now the plan is that, we would create the charcter/party and then add that charcter/party id
to the user like so:

    user: {

      email,

      characters: [{
          name: 'Some name',
          class,
          race,
          level
          id    
      }],

      parties: [{
          name,
          id
      }]

    }

That way, when we want to show all of the users characters/parties, we can simply just get the current user. And when we want to view a specific party/character, we would simply
do a get on character/party with the attached id.

So, the easiest way to do this would be to first create the character/party and then update the user with the resulting id and name and any other relevant info

This would actually be a good fit for a hook. We would have a hook for the character and party create that would create the character/party and pass it down to the user. 
https://docs.feathersjs.com/api/hooks.html#quick-example
We could put it in the app hook and check if the service being called is either charcter or party. And if so then create the character/party and pass down the id and relevant info to the user
