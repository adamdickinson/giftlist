import { h } from "preact" 
import { connect } from "preact-redux"
import * as itemActions from "../../actions/item"



export const Adder = props => {
  const onAdd = () => props.onAdd(props.item) && props.reset()
  const onEnter = e => e.key == "Enter" && onAdd() 
  return (
    <div className="adder">
      <input className="adder-input" placeholder="Enter the item you want, and hit enter" type="text" onKeyPress={onEnter} value={props.item || ""} onInput={e => props.update(e.target.value)} />  
    </div>
  )
}



export const mapDispatchToProps = dispatch => ({
  reset:  ()   => dispatch(itemActions.reset()),
  update: item => dispatch(itemActions.update(item))
})



export const mapStateToProps = state => ({
  item: state.item
})



export default connect(mapStateToProps, mapDispatchToProps)(Adder)
