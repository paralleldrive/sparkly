import { all, call } from 'redux-saga/effects';

function* helloWorldSaga() {
  yield console.log('hello world');
}

export default function* rootSaga() {
  yield all([call(helloWorldSaga)]);
}
