import React from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { fetchCurrencies } from "../../Store/CurrencySlice";
import { fetchProductDetailwithSelectedCurrency } from "../../Store/ProductDetailsSlice";
import { fetchProductListWithSelectedCurrency } from "../../Store/ProductsList";
import Cartoverlay from "../Cart/Cartoverlay";

import "./Navigation.css";

function withParams(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      showOverlay: false,
    };
  }

  componentDidMount() {
    const callApi = async () => {
      try {
        const res = await fetch("http://localhost:4000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `{
  categories {
    name     
  }
}`,
          }),
        });
        const data = await res.json();
        const category = data.data.categories.map((item) => item.name);
        this.props.navigate(`/products/${category[0]}`);
        this.setState({ categoryList: category });
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
    this.props.fetchCurrencies();
  }

  showOverlay() {
    this.setState({
      showOverlay: !this.state.showOverlay,
    });
  }

  currencyHandler(value) {
    console.log(value);
    this.props.fetchProductListWithSelectedCurrency(value);
    this.props.fetchProductDetailwithSelectedCurrency(value);
  }

  render() {
    return (
      <div className="wid">
        <div className="containerNav">
          <div className="nav-left">
            {this.state.categoryList.map((item, index) => {
              return (
                <NavLink
                  to={`/products/${item}`}
                  className="nav-link nav-link-grow-up nav-link-grow-up-active"
                  key={index}
                >
                  {item}
                </NavLink>
              );
            })}
          </div>
          <div className="parent">
            <img
              className="image1"
              src="/images/greenbox.png"
              alt="greenbox"
            ></img>
            <img
              className="image2"
              src="/images/ucurve.png"
              alt="greenbox"
            ></img>
          </div>

          <div className="icons">
            {this.props.currencySymbol.symbol}

            <div className="dropdown">
              <img
                className="arrow dropbtn"
                src="/images/down.png"
                alt="greenbox"
              ></img>
              <div className="dropdown-content">
                {this.props.selector.Currencies.map((item, index) => {
                  return (
                    <a key={index} onClick={() => this.currencyHandler(item)}>
                      {item.symbol} {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <img
              className=""
              src="/images/Vector.png"
              alt="greenbox"
              onClick={this.showOverlay.bind(this)}
            ></img>
            <span className="badge">{this.props.cart.totalquantity}</span>
          </div>
        </div>
        {this.state.showOverlay ? (
          <Cartoverlay clickHandler={this.showOverlay.bind(this)} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selector: state.currenciesList,
  currencySymbol: state.productList.currencySelected,
  cart: state.cart,
});

const mapDispatchToProps = {
  fetchProductDetailwithSelectedCurrency,
  fetchProductListWithSelectedCurrency,
  fetchCurrencies,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Navigation));
