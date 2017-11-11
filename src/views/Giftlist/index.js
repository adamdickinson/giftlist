import * as appActions from "../../actions/app"
import * as giftlistActions from "../../actions/giftlist"
import Adder from "../../components/Adder"
import Item from "../../components/Item"
import { connect } from "preact-redux"
import { h, Component } from "preact" 
import { routerActions } from "preact-router-redux"



export class Giftlist extends Component {

  componentWillMount() {
    this.props.confirmLoggedIn(() => {
      this.props.loadGiftlist()
    })
  }




  render(props) {
    return (
      <main>
        <header>
          <h1>My Giftlist</h1>
          <h3>Hey {props.user && props.user.first_name}!</h3>
          <p>
            Add all of the things you want, and others will be able to pick and choose which they 
            would like to get you. Add as many gifts as you can to make sure others can surprise you 
            with their lovely presents.
          </p>
        </header>
        <Adder onAdd={props.addItemToGiftlist} />
        <ul className="giftlist-list">
          { props.giftlist.list && props.giftlist.list.map(item => (
            <Item 
              content={item} 
              onRemove={() => props.removeItemFromGiftlist(item)} 
            />
          )) }
        </ul>
        <button onClick={props.switchToPicker}>Pick gifts</button>
        <button onClick={props.logOut}>Log out</button>
      </main>
    )
  }

}



export const mapStateToProps = state => ({
  user:     state.app.user,
  giftlist: state.giftlist
})



export const mapDispatchToProps = dispatch => ({
  addItemToGiftlist:      item => dispatch(giftlistActions.addItem(item)),
  confirmLoggedIn:        then => dispatch(appActions.confirmLoggedIn(then)), 
  loadGiftlist:           ()   => dispatch(giftlistActions.loadGiftlist()), 
  logOut:                 ()   => dispatch(appActions.logOut()),
  switchToPicker:         ()   => dispatch(routerActions.push("/picker")),
  removeItemFromGiftlist: item => dispatch(giftlistActions.removeItem(item))
})



export default connect(mapStateToProps, mapDispatchToProps)(Giftlist)
