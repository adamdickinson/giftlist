import * as appActions from "../../actions/app"
import * as giftlistActions from "../../actions/giftlist"
import CheckIcon from "preact-icons/md/check" 
import Adder from "../../components/Adder"
import Item from "../../components/Item"
import { connect } from "preact-redux"
import { h, Component } from "preact" 
import { routerActions } from "preact-router-redux"



export class Picker extends Component {

  componentWillMount() {
    this.props.confirmLoggedIn(() => {
      this.props.loadGiftlists()
    })
  }




  render(props) {
    return (
      <main>
        <header>
          <h1>Pick from Giftlists</h1>
          <h3>Hey {props.user && props.user.first_name}!</h3>
          <p>
            Pick out the gifts you'd like to buy for others! Once you've picked it, nobody else can.
          </p>
        </header>
        { props.giftlists.map(giftlist => (
          <div>
            <h2>{ giftlist.owner.first_name } wants...</h2>
            <ul className="giftlist-list">
              { giftlist.list.map(item => {
                const claimedBy = giftlist.claims && giftlist.claims[item] && giftlist.claims[item]
                const status = claimedBy == props.user.id && <CheckIcon size={24} />
                return (
                <Item 
                  content={item} 
                  disabled={claimedBy && claimedBy != props.user.id}
                  status={status}
                  onClick={() => props.toggleClaim(item, props.user, giftlist)} 
                />
                )
              }) }
            </ul>
          </div>
        )) }
        <button onClick={props.switchToGiftlist}>My Giftlist</button>
        <button onClick={props.logOut}>Log out</button>
      </main>
    )
  }

}



export const mapStateToProps = state => ({
  user:      state.app.user,
  giftlists: state.giftlists
})



export const mapDispatchToProps = dispatch => ({
  toggleClaim:            (item, user, giftlist) => dispatch(giftlistActions.toggleClaim(item, user, giftlist)),
  confirmLoggedIn:        then => dispatch(appActions.confirmLoggedIn(then)), 
  loadGiftlists:          ()   => dispatch(giftlistActions.loadOthersGiftlists()), 
  logOut:                 ()   => dispatch(appActions.logOut()),
  switchToGiftlist:       ()   => dispatch(routerActions.push("/giftlist")),
  removeItemFromGiftlist: item => dispatch(giftlistActions.removeItem(item))
})



export default connect(mapStateToProps, mapDispatchToProps)(Picker)
