import React from "react";

import { NavLink, useParams } from "react-router-dom";
import { fetchProductsList } from "../../Store/ProductsList";
import { connect } from "react-redux";

import "./Category.css";

function withParams(Component) {
  return (props) => <Component {...props} param={useParams()} />;
}

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      param: this.props.param,
    };
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
                <NavLink
                  to={`/product/${item.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card">
                    <img
                      src={item.gallery}
                      className="card__image"
                      alt=""
                    ></img>
                    <div className="card__content">
                      <p>{item.brand}</p>
                      <p>{item.name}</p>
                    </div>
                    <div className="card_info">
                      {item.price.currency.symbol} &nbsp;
                      {item.price.amount}
                    </div>
                  </div>
                </NavLink>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Category));
