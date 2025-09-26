import { pipe, prop } from 'ramda';

export const sliceName = 'userAuthentication';

const initialState = {
  emailError: '',
  nameError: '',
};

export const signUpClicked = ({ name = '', email = '' } = {}) => ({
  type: 'SIGN_UP_CLICKED',
  payload: { name, email },
});

export const signUpFailed = ({ emailError = '', nameError = '' } = {}) => ({
  type: 'SIGN_UP_FAILED',
  payload: { emailError, nameError },
});

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case signUpClicked().type: {
      return { ...state, nameError: '', emailError: '' };
    }
    case signUpFailed().type: {
      return { ...state, ...payload };
    }
    default: {
      return state;
    }
  }
};

const selectUserAuthenticationSlice = prop(sliceName);

export const selectEmailError = pipe(
  selectUserAuthenticationSlice,
  prop('emailError'),
);

export const selectNameError = pipe(
  selectUserAuthenticationSlice,
  prop('nameError'),
);
