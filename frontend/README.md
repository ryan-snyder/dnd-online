This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Frontend for DND character creator

## Features:

   * Able to create a new account
   * login/signout/etc
   * Able to create a  new character
   * Able to save character
   * Able to edit character
   * Able to delete character
   * Able to create a party
   * Able to join a party
   * Able to invite people to a party that you created or have sufficent permissions for
   * Able to track stats/health/equipment/level/etc for a character
   * Able to make attack rolls/save rolls/etc

## Design

Built with reactjs

Classes/races/stats/equipment/etc provided by http://www.dnd5eapi.co/

Communicates with third party apis with either [axios](https://github.com/axios/axios) or [superagent](https://github.com/superagent/superagent)

Uses featherjs for auth and communicating with our api

## Redux

I plan on using redux because I'm familar with it. But I'm starting to wonder if I really need it.
The only thing that will rely on it is whether or not the user is logged in. But Redux seems overkill for that.

The plan right now is to check if we're signed in with feathersjs in app.js. And then pass that value down to all of our Routes

This way, It accomplishes roughly the same thing as redux without having uneccesary code


# Pages

## Main Page

   The main page will connect to our backend and check to see if we're logged in. If we're not logged in, then show the character creation screen. If we are logged in, then show either the last page they were on, or give them the various options to choose from

## Character creation screen

   The character creation screen will allow users to create a character using the allowable options. If the user is not 
   logged in and they try to save a character, we will prompt them to either create an account or login. 
   We may add the option to save it temporarily. 
   The character creation screen will show the current stats for the character and will update as needed 
If the user is logged in, allow them to see all of their created characters as well. In a sidebar probably

### character object (client side)

The plan for the character object is the following:
```js
{
    class: {
        name: '',
        other options
    },
    race: {
        name: '',
        other options
    }
}
```

Every possible character "attribute" will have a "name". The "name" with the identifier for the value

So for class, If your class is wizard, then name will be wizard and so forth

A character attribute is the top level name for the options

So a character can have a class, race, level, traits, features, spells, equipment, stats

### Storing and modify character data
So..we have a couple of options here
a) We have a different hook for each "attribute"
b) we have one hook for the entire character object and we modify it that

The second one is a much better option in regards to that we only have to worry about one hook instead of 20 different hooks


The hardest part of all this is going to be handling modifications
Because in DnD something as simple as race can alter 2-3 other attributes
So it's going to be fairly complicated to render and show all of the changes

I'm thinking of using https://material-ui.com/components/steppers/ for the UI maybe?

Either that or simple tabs

And the character data will be a seperate view on the side that will show all of the current attributes

## Party screen

   This screen will allow users to view existing parties and create a new party. If the user is not logged in, we will prompt them to create an account or login. This screen will by default show all of the users parties if their are any and will have a button to create a new party. This will have a list of all parties and the appropriate buttons to edit, delete the party

## Party Creation screen

   This is the screen that will allow users to create a party. A party must have a name and when created will generate a unique link for users to join.
**Every user who creates/joins a party must have a character to join with**
   
   
## Unique url and Party Joining

Server side, when a user creates a new party a unique url is generated and saved in the db. On the client, if someone hits that url, we need to check the db for a matching url and allow them to join the party as a member.
Aha! https://reacttraining.com/react-router/web/api/Route https://stackoverflow.com/questions/46534955/route-handling-a-uniquely-generated-url-specific-to-a-user-in-reactjs-and-react

We can use the above to detect the unique url and render the correct page. 



**For future reference: There is a lot more I could do on the security side of things. I should make a doc for that**

### Security considerations
* We should make a custom method that simply checks if the url exists and sends back a 200
    * reason for this is that we don't want to execute a find and have it return all the matching urls. Or we could for now
* Have an expirary date for the url. Or allow the user to either regenerate or delete the url
* We could confirm with the user who created the party if the user is allowed.
* If the user is not signed in, we should prompt them to create an account and create a character
# Folder Structure

## Src

### containers
Any component that either renders/implements components but is not its own page or A component that renders multiple pages (I.E App)
    - containers/
        - App/
            App.js
            etc
### pages
A complete page.
    - pages/
        characterCreationPage.js
        authPage.js
        partyPage.js
        partyCreationPage.js
        etc
### components
A React component that is used in multiple places
    - components/
        header.js
        sidebar.js
        login.js
        etc
### feather
Any code related to feathersjs
    - feather/
        feathers.js
### actions
Redux actions

### reducers
Redux reducers

### api
code to handle api calls
    Unclear if featherjs calls will go here?
    For sure third party calls will
    - api/
        - characters/
            - creation.js
            - update.js
            etc
        etc
### How to handle api calls

We should come up with a decent way to handle api calls and make functions to provide all the functionality

ideally we would do something like getClasses(), getSpells('query'), etc

But there's going to have to be some thought about the exact way. For example will we do it in seperate files, should we cache, should we queue, what kind of headers, etc
        
## Available Scripts

In the project directory, you can run:

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration
