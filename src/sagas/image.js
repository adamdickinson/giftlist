import { call, put, select, takeEvery } from "redux-saga/effects"
import * as imageActions from "../actions/image"
import * as imageHelpers from "../helpers/image"



export function * requestImageFor({ keywords }) {
  const image = yield call(imageHelpers.fetchOne, keywords)
  let url
  try {
    url = image.data && URL.createObjectURL(image.data)
  } catch(error) {
    url = "about:blank"
  }
  yield put(imageActions.setImageFor(keywords, url))
}



const imageSelector = (state, keywords) => keywords in state.images



export default [
  takeEvery("REQUEST_IMAGE_FOR", requestImageFor)
]
