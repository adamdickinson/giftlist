import * as appActions from "../../actions/app"
import * as giftlistActions from "../../actions/giftlist"
import Adder from "../../components/Adder"
import Item from "../../components/Item"
import { connect } from "preact-redux"
import { h } from "preact" 



export const Login = props => (
  <main>
    <header>
      <h1>Giftlist</h1>
      <p>Login with Facebook below to get started!</p>
      <button disabled={props.loggingIn} onClick={() => props.loginWithFacebook()}>{ props.loggingIn ? "Logging in..." : "Log in" }</button>
    </header>
  </main>
)



export const mapStateToProps = state => ({
  loggingIn: state.app.status && state.app.status == "LOGGING_IN"
})



export const mapDispatchToProps = dispatch => ({
  loginWithFacebook: () => dispatch(appActions.loginWithFacebook())
})



export default connect(mapStateToProps, mapDispatchToProps)(Login)
