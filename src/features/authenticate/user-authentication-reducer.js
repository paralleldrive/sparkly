import { pipe, prop } from 'ramda';

export const sliceName = 'userAuthentication';

const initialState = {
  isAwaitingVerification: false,
};

export const showVerificationAwaiting = () => ({
  type: 'SHOW_VERIFICATION_AWAITING',
});

export const reducer = (state = initialState, { type } = {}) => {
  switch (type) {
    case showVerificationAwaiting().type: {
      return { ...state, isAwaitingVerification: true };
    }
    default: {
      return state;
    }
  }
};

const selectUserAuthenticationSlice = prop(sliceName);

export const selectIsAwaitingVerification = pipe(
  selectUserAuthenticationSlice,
  prop('isAwaitingVerification'),
);
