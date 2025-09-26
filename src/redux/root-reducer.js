import { combineReducers } from '@reduxjs/toolkit';

import {
  reducer as userAuthenticationReducer,
  sliceName as userAuthenticationSliceName,
} from '@/features/authenticate/user-authentication-reducer';

const rootReducer = combineReducers({
  [userAuthenticationSliceName]: userAuthenticationReducer,
});

export default rootReducer;
