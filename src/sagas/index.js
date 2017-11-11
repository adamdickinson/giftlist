import { all } from "redux-saga/effects"



export default function * rootSaga() {
  yield all([
    ...require("./app").default,
    ...require("./image").default,
    ...require("./giftlist").default,
  ])
}
