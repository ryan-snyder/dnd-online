import autodux from 'autodux';
/**
 * TODO:
 * Hook up to redux/redux-saga
 * Add character/party actions
 */
export const {
    reducer,
    initial,
    actions: {
      signIn,
      signOut,
      register,
      getCharacter,
      getCharacters,
      getParties,
      createCharacter
      
    },
  } = autodux({
    // the slice of state your reducer controls
    // The initial value of your reducer state
    initial:  {
        signedIn: false,
        user: {},
        onSignInPage: false,
        characters: [],
        parties: [],
        currentCharacter: {}
    }
    // No need to implement switching logic -- it's
    // done for you.
    // No need to select the state slice -- it's done for you.
  });
