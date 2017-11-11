import * as appActions from "../actions/app"
import * as database from "../helpers/database"
import * as oauthConfig from "../config/oauth"
import * as routerActions from "preact-router-redux"
import * as giftlistActions from "../actions/giftlist"
import * as giftlistHelpers from "../helpers/giftlist"
import Facebook from "facebook-oauth-agent"
import axios from "axios"
import { cps, call, put, select, take, takeEvery } from "redux-saga/effects"



export function * confirmLoggedIn({ then }) {
  const ready = yield select(selectIsReady)
  if( !ready )  yield take("READY")

  const user = yield select(selectUser)
  if(!user) {
    yield put(routerActions.push("/"))

  } else if(then) {
    yield call(then)

  }
}



export function * loadUser() {
  try {
    const session = yield call(database.getSession)
    yield put(appActions.setUser(session.user))
  } catch(error) { console.log(error) }
  yield put(appActions.ready())
}



export function * loginUser({ user }) {
  yield call(database.setSession, { user })
  yield put(routerActions.push("/giftlist"))
}



export function * logout() {
  try {
    yield call(database.destroySession)
  } catch(error) {}
  yield put(appActions.clearUser())
  yield put(routerActions.push("/"))
}



export function * loginWithFacebook() {
  const redirect_uri = oauthConfig.getFacebookRedirectUri(window.location)
  const code = yield cps(Facebook, { 
    client_id: oauthConfig.facebook.client_id, 
    redirect_uri, 
    scope: "email" 
  })

  const response = yield call(axios.post, redirect_uri, { code })
  yield put(appActions.loginUser(response.data))
  yield put(appActions.setUser(response.data))
  yield put(routerActions.push("/giftlist"))
}



const selectIsReady = state => state.app.ready
const selectUser = state => state.app.user



export default [
  takeEvery("BOOTSTRAP", loadUser),
  takeEvery("LOGIN_USER", loginUser),
  takeEvery("LOGOUT", logout),
  takeEvery("CONFIRM_LOGGED_IN", confirmLoggedIn),
  takeEvery("LOGIN_WITH_FACEBOOK", loginWithFacebook)
]
