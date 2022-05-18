import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { addproduct, removeproduct } from "../../Store/CartSlice";
import "./Cartoverlay.css";

class Cartoverlay extends React.Component {
  
  addProduct(item) {
    this.props.addproduct(item);
  }
  removeProduct(item) {
    this.props.removeproduct(item);
  }
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "unset";
  }

  render() {
    return (
      <>
        <div className="cartOverlay">
          <div className="Cart-Container">
            <div className="Header">
              <h3 className="Heading">My Bag,</h3>
              <span className="Heading">
                {this.props.selector.totalquantity}
              </span>
            </div>
            <div className="modal-content">
              {this.props.selector.products.length === 0 ? (
                <h1>Cart is empty</h1>
              ) : (
                ""
              )}

              {this.props.selector.products.map((item, index) => {
                return (
                  <div className="Cart-Items" key={index}>
                    <div className="about">
                      <h1 className="title">{item.name}</h1>
                      <h3 className="subtitle">
                        {item.price.currency.symbol} &nbsp;
                        {item.price.amount.toFixed(2)}
                      </h3>
                      <div> </div>
                      {item.attributes.map((el, ind) => {
                        if (el.id === "Color") {
                          return (
                            <button key={index} className="btn" style={{ background: `${el.value}` }} />
                          );
                        }
                        return (
                          <div key={ind}>
                            <span>{el.id}</span>
                            <div className="sizeBtn">
                              <button className="btn">{el.value}</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="counter">
                      <div className="btn" onClick={() => this.addProduct(item)} >+</div>
                      <div className="count">{item.quantity}</div>
                      <div   className="btn" onClick={() => this.removeProduct(item)}> - </div>
                    </div>
                    <div className="image-box">
                      <img src={`${item.gallery[0]}`} alt="" />
                    </div>
                  </div>
                );
              })}

              <div className="CartTotal">
                <div className="TotalString">Total</div>
                <div className="TotalAmount">
                  {this.props.selector.selectedCurrency} &nbsp;
                  {this.props.selector.totalAmount.toFixed(2)}
                </div>
              </div>
              <div className="Cartbtn">
                <NavLink to={`/cart`}>
                  <button  className="view_bag" onClick={this.props.clickHandler}>
                    View Bag
                  </button>
                </NavLink>
                <button className="checkout" onClick={this.props.clickHandler}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
        )
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selector: state.cart,
});

const mapDispatchToProps = {
  addproduct,
  removeproduct,
};

//connect(mapStateToProps, mapDispatchToProps) PDP;
export default connect(mapStateToProps, mapDispatchToProps)(Cartoverlay);
