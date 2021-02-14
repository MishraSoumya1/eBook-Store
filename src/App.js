import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { HomeScreen, MyOrders, Cart } from "./screens";
import Checkout from "./components/checkout/Checkout.jsx";
import PropTypes from "prop-types";

const App = ({ cartItems }) => {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="sticky">
          <Link to="/">
            <strong>Book Store</strong>
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="menu-space">
              <Link to="/">Home</Link>
            </div>
            <div className="menu-space">|</div>
            <div className="menu-space">
              <Link to="/my-order">My Orders</Link>
            </div>
            <div className="menu-space">|</div>
            <div className="menu-space">
              <Link to="/cart">
                Cart <span style={{ color: "red" }}>{cartItems}</span>
              </Link>
            </div>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/my-order" component={MyOrders} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </main>
        <Checkout />
        <footer>All rights are reserved to Soumya.</footer>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  cartItems: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems.length || 0,
});

export default connect(mapStateToProps)(App);
