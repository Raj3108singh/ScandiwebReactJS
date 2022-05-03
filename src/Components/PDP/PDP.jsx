import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { addproduct } from "../../Store/CartSlice";
import {
  fetchProductDetail,
  updateDefaultImg,
} from "../../Store/ProductDetailsSlice";
import "./PDP.css";

function withParams(Component) {
  return (props) => <Component {...props} param={useParams()} />;
}

class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attri: [] };
  }

  componentDidMount() {
    const param = this.props.param;
    this.props.fetchProductDetail(param);
  }

  openImage(e) {
    this.props.updateDefaultImg(e);
  }

  attributeSelection(id, value) {
    this.setState((state, props) => {
      const existingObj = state.attri.findIndex((item) => item.id === id.id);

      if (existingObj >= 0) {
        const existingattri = state.attri[existingObj];
        existingattri.value = value.displayValue;
        const otherattri = state.attri.filter(
          (item) => item.id !== existingattri.id
        );

        return { attri: [...otherattri, existingattri] };
      } else {
        return {
          attri: [
            ...state.attri,
            { id: id.id, value: value.displayValue, selected: true },
          ],
        };
      }
    });
  }

  AdditemtoCart() {
    const attributsList = this.props.selector.productDetail.attributes.map(
      (item) => {
        return item.id;
      }
    );

    let vall = true;
    attributsList.forEach((element) => {
      if (this.state.attri.filter((item) => item.id === element).length === 0) {
        alert(`Please select ${element}`);
        vall = false;
      }
    });
    if (vall) {
      const obj = {
        id: this.props.selector.productDetail.id,
        name: this.props.selector.productDetail.name,
        attributes: this.state.attri,
        price: this.props.selector.productDetail.prices,
        itemAmount: Number(this.props.selector.productDetail.prices.amount),
        quantity: 1,
        gallery: this.props.selector.productDetail.defaultImg,
      };
      this.props.addproduct(obj);
      this.setState({ attri: [] });
      alert("Product Added");
    }
  }

  render() {
    return (
      <div className="small-container">
        <div className="row">
          <div className="col-left">
            {this.props.selector.productDetail.gallery.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => this.openImage(item)}
                alt=""
              ></img>
            ))}
          </div>
          <div className="col-right">
            <div className="col-1-right">
              <img
                src={this.props.selector.productDetail.defaultImg}
                className="image"
                alt=""
              ></img>
            </div>
            <div className="col-2-right">
              <h1>{this.props.selector.productDetail.name}</h1>
              <div>
                {this.props.selector.productDetail.attributes.map(
                  (el, index) => {
                    return (
                      <div>
                        <div key={index}>{el.id}</div>
                        {el.items.map((item, index) => {
                          if (el.id === "Color") {
                            return (
                              <button
                                onClick={() =>
                                  this.attributeSelection(el, item)
                                }
                                key={index}
                                style={{
                                  background: `${item.value}`,
                                  width: "30px",
                                  height: "30px",
                                  margin: "5px",
                                }}
                              ></button>
                            );
                          }
                          return (
                            <button
                              style={{
                                margin: "5px",
                              }}
                              key={index}
                              onClick={() => this.attributeSelection(el, item)}
                            >
                              {item.displayValue}
                            </button>
                          );
                        })}
                      </div>
                    );
                  }
                )}
              </div>
              <div>
                <div>Price</div>
                <div>
                  {this.props.selector.productDetail.prices.currency.symbol}
                  &nbsp;
                  {this.props.selector.productDetail.prices.amount}
                </div>
              </div>
              <div>
                <button
                  className="addToCart"
                  onClick={this.AdditemtoCart.bind(this)}
                >
                  Add to Cart
                </button>
              </div>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.selector.productDetail.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selector: state.productDetails,
});

const mapDispatchToProps = {
  fetchProductDetail,
  updateDefaultImg,
  addproduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(withParams(PDP));
