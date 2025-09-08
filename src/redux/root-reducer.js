import { combineReducers } from '@reduxjs/toolkit';

import {
  reducer as userAuthenticationReducer,
  sliceName,
} from '../features/authenticate/user-authentication-reducer';

export const rootReducer = combineReducers({
  [sliceName]: userAuthenticationReducer,
});
