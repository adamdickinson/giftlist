import * as appActions from "./actions/app"
import Login from "./views/Login"
import Picker from "./views/Picker"
import Router from 'preact-router'
import Giftlist from "./views/Giftlist"
import configureStore from "redux"
import createHistory from "history/createBrowserHistory"
import createSagaMiddleware from "redux-saga"
import reducer from "./reducers"
import sagas from "./sagas"
import { Provider } from "preact-redux"
import { applyMiddleware, compose, createStore } from "redux"
import { h, Component } from "preact"
import { routerMiddleware, syncHistoryWithStore } from 'preact-router-redux'

import "./style.css"



const browserHistory = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer, 
  composeEnhancers(
    applyMiddleware(sagaMiddleware), 
    applyMiddleware(routerMiddleware(browserHistory))
  )
)

const history = syncHistoryWithStore(browserHistory, store)
sagaMiddleware.run(sagas)



window.login = () => store.dispatch(appActions.loginUser({ id: 1, first_name: "Testing" }))



export default class App extends Component {

  componentWillMount() {
    store.dispatch(appActions.bootstrap())
  }



  render() { 
    return (
      <Provider store={store}>
        <Router history={history}>
          <Login path="/" />
          <Giftlist path="/giftlist" />
          <Picker path="/picker" />
        </Router>
      </Provider>
    )
  }
}
