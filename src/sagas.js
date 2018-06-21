import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// 觀察者 saga：觀看派遣(dispatched)到store的actions，開始工人saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// 函數，使api請求並返回Promise以進行響應
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

//工人 saga：當工人saga看到action時發出api呼叫
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", dog });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}