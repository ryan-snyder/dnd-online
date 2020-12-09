/**
 * TODO:
 * Hook up to redux/redux-saga
 * Add character/party actions
 */
const Reducer = (state, action) => {
    console.log(`action is ${action.type} with ${action.payload}`);
    switch (action.type) {
        case 'REGISTER': 
            return {
                ...state,
                onSignInPage: action.payload
            }
        case 'SIGN_IN':
            return {
                ...state,
                signedIn: action.payload.signedIn,
                user: action.payload.user
            }
        case 'SIGN_OUT':
            return {
                ...state,
                signedIn: false,
                user: {}
            }
        default:
            return state;
    }
};

export default Reducer;
