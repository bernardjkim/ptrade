/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// CREATE SESSION
export const CREATE_SESSION = 'app/App/CREATE_SESSION';
export const CREATE_SESSION_SUCCESS = 'app/App/CREATE_SESSION_SUCCESS';
export const CREATE_SESSION_ERROR = 'app/App/CREATE_SESSION_ERROR';

// DELETE SESSION
// TODO: is it enough to just delete the client-side token? or do i need to
// black list token on the backend?
export const DELETE_SESSION = 'app/App/DELETE_SESSION';
export const DELETE_SESSION_SUCCESS = 'app/App/DELETE_SESSION_SUCCESS';
export const DELETE_SESSION_ERROR = 'app/App/DELETE_SESSION_ERROR';

export const LOAD_TOKEN = 'app/App/LOAD_TOKEN';
