import * as imageActions from "../../actions/image"
import DeleteIcon from "preact-icons/md/delete" 
import { connect } from "preact-redux"
import { h, Component } from "preact"



export class Item extends Component {

  componentWillMount(props) {
    this.props.requestImageFor(this.props.content)
  }



  render(props) {
    const onClick  = props.disabled ? null : props.onClick
    const onRemove = props.disabled ? null : props.onRemove
    return (
      <li className={["item", onClick && "clickable"].join(" ")} disabled={props.disabled} onClick={onClick}>
        <i 
          className="item-image" 
          style={ props.content in props.images && { backgroundImage: `url(${props.images[props.content]})` } } 
        />
        <span className="item-label">{ props.content }</span>
        { props.status && <span className="item-status">{ props.status }</span> }
        { onRemove && (
          <button className="item-remove" onClick={onRemove}>
            <DeleteIcon size={24} />
          </button>
        ) }
      </li>
    )
  }

}




export const mapStateToProps = state => ({
  images: state.images
})



export const mapDispatchToProps = dispatch => ({
  requestImageFor: keywords => dispatch(imageActions.requestImageFor(keywords))
})




export default connect(mapStateToProps, mapDispatchToProps)(Item)
