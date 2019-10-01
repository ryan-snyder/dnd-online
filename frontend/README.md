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