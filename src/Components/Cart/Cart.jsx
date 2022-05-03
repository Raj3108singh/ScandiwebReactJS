import React from "react";
import { connect } from "react-redux";
import { removeproduct, addproduct } from "../../Store/CartSlice";

import classes from "./Cart.module.css";

class Cart extends React.Component {
  removeitem(item) {
    this.props.removeproduct(item);
  }
  additem(item) {
    this.props.addproduct(item);
  }

  render() {
    return (
      <div>
        <div className={classes.CartContainer}>
          <div className={classes.Header}>
            <h3 className={classes.Heading}>Cart</h3>
          </div>
          <hr></hr>
          {this.props.selector.products.map((item, index) => {
            return (
              <>
                <div className={classes.CartItems} key={index}>
                  <div className={classes.about}>
                    <h1 className={classes.title}>{item.name}</h1>
                    <h3 className={classes.subtitle}>
                      {this.props.selector.selectedCurrency} &nbsp;
                      {item.price.amount.toFixed(2)}
                    </h3>

                    {item.attributes.map((el, ind) => {
                      return (
                        <div key={ind}>
                          <span className={classes.span_attri}>{el.id}</span>
                          <div className={classes.sizeBtn}>
                            <button className={classes.btn}>{el.value}</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={classes.counter}>
                    <div
                      className={classes.btn}
                      onClick={() => this.additem(item)}
                    >
                      +
                    </div>
                    <div className={classes.count}>{item.quantity}</div>
                    <div
                      className={classes.btn}
                      onClick={() => this.removeitem(item)}
                    >
                      -
                    </div>
                  </div>
                  <div className={classes.imageBox}>
                    <img src={item.gallery} style={{ width: "200px" }} alt="" />
                  </div>
                </div>
                <hr></hr>
              </>
            );
          })}

          <div className={classes.CartTotal}>
            <div className={classes.TotalAmount}>
              <span>Total:</span> {this.props.selector.selectedCurrency} &nbsp;
              {this.props.selector.totalAmount.toFixed(2)}
            </div>
          </div>
          <div>
            <button className={classes.Cartbtn}>Order</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selector: state.cart,
});

const mapDispatchToProps = {
  removeproduct,
  addproduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
