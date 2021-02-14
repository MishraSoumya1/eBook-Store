import { useEffect } from "react";
import { connect } from "react-redux";
import Alert from "../components/alert/Alert.jsx";
import Cartitems from "../components/cartItems/CartItems.jsx";
import { removeFromCart } from "../actions/cartActions";
import { openCheckout } from "../actions/checkoutAction";
import { convertCurrency } from "../util";
import PropTypes from "prop-types";

const Cart = ({ cartItems, removeItem, checkoutOpen }) => {
  useEffect(() => {
    document.title = "eBook Store | Cart";
  }, []);

  const calcTotalPrice = (arr) => {
    let sum = 0;
    for (let item of arr) {
      sum += Number(item.count) * convertCurrency(item.price);
    }
    return sum.toFixed(2);
  };

  return (
    <div className="content">
      <div
        className="main"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {(cartItems && cartItems.length === 0 && (
          <Alert
            message="No item present in the cart"
            isClose={() => {
              console.log("closed");
            }}
          />
        )) || (
          <Cartitems
            items={cartItems}
            removeItem={(data) => removeItem(data)}
          />
        )}
        {cartItems && cartItems.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <strong>Total Price: ${calcTotalPrice(cartItems)}</strong>
          </div>
        )}
        {cartItems && cartItems.length > 0 && (
          <button
            className="button"
            style={{
              backgroundColor: "#f0c040",
              color: "#1a1717",
              width: "40%",
              marginTop: "20px",
            }}
            onClick={() =>
              checkoutOpen({
                cartItems,
                totalPrice: calcTotalPrice(cartItems),
                shouldClearCart: true,
              })
            }
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  checkoutOpen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (data) => dispatch(removeFromCart(data)),
  checkoutOpen: (data) => dispatch(openCheckout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
