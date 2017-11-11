import { call, select, put, takeEvery } from "redux-saga/effects"
import * as giftlistActions from "../actions/giftlist"
import * as giftlistHelpers from "../helpers/giftlist"



export function * claimItem({ by, item, giftlist }) {
  const giftlists = yield select(selectGiftlists)
  giftlist = giftlists.find(list => list._id = giftlist._id)
  console.log(giftlist)
  yield call(giftlistHelpers.update, giftlist.owner, giftlist)
}



export function * load() {
  const user = yield select(selectUser)
  if(!user) return
  const giftlistDoc = yield call(giftlistHelpers.get, user)
  yield put(giftlistActions.setGiftlist(giftlistDoc))
}



export function * loadOthers() {
  const user = yield select(selectUser)
  if(!user) return
  const giftlistDocs = yield call(giftlistHelpers.getNot, user)
  yield put(giftlistActions.setGiftlists(giftlistDocs))
}



export function * update() {
  const giftlist = yield select(selectGiftlist)
  const user = yield select(selectUser)
  yield call(giftlistHelpers.update, user, giftlist)
}



const selectUser = state => state.app.user
const selectGiftlist = state => state.giftlist
const selectGiftlists = state => state.giftlists



export default [
  takeEvery("TOGGLE_CLAIM_ITEM_IN_GIFTLIST", claimItem),
  takeEvery("LOAD_OTHERS_GIFTLISTS", loadOthers),
  takeEvery("LOAD_GIFTLIST", load),
  takeEvery("REMOVE_ITEM_FROM_GIFTLIST", update),
  takeEvery("ADD_ITEM_TO_GIFTLIST", update)
]
