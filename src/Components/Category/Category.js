import React from "react";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchProductsList } from "../../Store/ProductsList";
import { connect } from "react-redux";
import {addproduct} from "../../Store/CartSlice"

import "./Category.css";

function withParams(Component) {
  return (props) => <Component {...props} param={useParams()} navigate={useNavigate()} />;
}

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      param: this.props.param,
      ishover:false,
      productId:''
    };
  }
  handleHover(item){    
    this.setState(prevState=> ({
      ishover : !prevState.ishover,
      productId:item
    }))
  }
  addtoCart(event,item){      
    const defaulAttributes = item.attributes.map((item)=>{
      return  {id:item.id,value:item.items[0].displayValue,selected: true};      
    })
    
    const obj = {
      id: item.id,
      name: item.name,
      attributes: defaulAttributes,
      price: item.price,
      itemAmount: Number(item.price.amount),
      quantity: 1,
      gallery: item.gallery,
    };   
    this.props.addproduct(obj);
    event.stopPropagation()
  }
  navigate(item){
    this.props.navigate(`/product/${item.id}`)
    
  }
  componentDidMount() {
    const param = this.props.param;
    this.props.fetchProductsList(param.category);
  }

  componentDidUpdate(prevprops) {
    if (prevprops.param.category !== this.props.param.category) {
      const param = this.props.param;
      this.props.fetchProductsList(param.category);
    }
  }

  render() {
   
    return (
      <div className="container">
        <h1 className="headerName">{this.props.selector.name}</h1>
        <div>
          <div className="cards">
            {this.props.selector.products.map((item, index) => {
              return (
                
                  <div className="card"   key={index} 
                       onClick={()=>this.navigate(item)} 
                       onMouseEnter={()=>this.handleHover(item.id)} 
                       onMouseLeave={()=>this.handleHover(item.id)}
                  >
                    <img src={item.gallery[0]} className="card__image" alt=""></img>
                    <div className={item.inStock ? "hide_overlay":"overlay"}> <p>Out of Stock</p></div>
                    <div className= {this.state.ishover && this.state.productId ===item.id && item.inStock? "add-cart-icon-container" :"hide-add-cart-icon-container"}   
                        onClick={(e)=> this.addtoCart(e,item)}
                    >
                      <img src="/images/ProductCard/Surface.png" alt="surface" className="add-to-cart1"/>
                      <img src="/images/Vector.png" alt="vector"className="add-to-cart2"/>
                    </div>

                    <div className="card__content">
                      <p>{item.brand}</p>
                      <p>{item.name}</p>
                    </div>
                    <div className="card_info">
                      {item.price.currency.symbol} &nbsp;
                      {item.price.amount}
                    </div>
                  </div>                
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

//export default Category;
const mapStateToProps = (state) => ({
  selector: state.productList,
});

const mapDispatchToProps = {
  fetchProductsList,
  addproduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Category));
