import { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Alert from "../alert/Alert.jsx";
import { closeCheckout } from "../../actions/checkoutAction";
import { clearCart } from "../../actions/cartActions";
import { useHistory } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import PropTypes from "prop-types";
import "./checkout.scss";

const Checkout = ({
  isCheckoutOpen,
  closeCheckout,
  cartItems,
  totalPrice,
  clearCart,
  shouldClearCart,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState("");
  const history = useHistory();

  const calcQuantity = (cartItems) => {
    let sum = 0;
    for (let item of cartItems) {
      sum += item.count;
    }
    return sum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && address) {
      closeCheckout();
      const data = JSON.parse(localStorage.getItem("orders"));
      const checkOutObj = {
        books: cartItems.map((data) => data.name).join(", "),
        count: calcQuantity(cartItems),
        time: new Date().toLocaleString(),
        totalPrice,
        name,
        email,
        address,
      };
      if (data) {
        if (Array.isArray(data)) {
          data.push(checkOutObj);
        }
        localStorage.setItem("orders", JSON.stringify(data));
      } else {
        const arr = [checkOutObj];
        localStorage.setItem("orders", JSON.stringify(arr));
      }
      if (shouldClearCart) {
        clearCart();
      }
      setAlert("");
      setName("");
      setEmail("");
      setAddress("");
      history.push("/my-order");
    } else {
      setAlert("Form fields can't be blank");
      scroller.scrollTo("myAlert", {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: 50, // Scrolls to element + 50 pixels down the page
      });
    }
  };

  return (
    <Modal
      isOpen={isCheckoutOpen}
      onRequestClose={() => {
        closeCheckout();
        setAlert("");
        setName("");
        setEmail("");
        setAddress("");
      }}
      appElement={document.getElementById("root")}
    >
      <Zoom>
        <button
          className="close-modal"
          onClick={() => {
            closeCheckout();
            setAlert("");
            setName("");
            setEmail("");
            setAddress("");
          }}
        >
          x
        </button>
        <div className="wrapper">
          {alert && alert.length > 0 && (
            <Element name="myAlert">
              <div style={{ marginBottom: "20px" }}>
                {" "}
                <Alert message={alert} isClose={() => setAlert("")} />{" "}
              </div>
            </Element>
          )}
          <div
            style={{
              backgroundColor: "#2b4e9e",
              width: "100%",
              height: "30px",
              marginBottom: "20px",
              borderRadius: "5px",
            }}
          >
            <h2 style={{ color: "#fff" }}>Checkout</h2>
          </div>
          <div className="table">
            <div className="row header blue">
              <div className="cell">Book</div>
              <div className="cell">Unit Price</div>
              <div className="cell">Quantity</div>
            </div>

            {cartItems.map((item, index) => {
              return (
                <div key={index} className="row">
                  <div className="cell" data-title="Book">
                    {item.name}
                  </div>
                  <div className="cell" data-title="Unit Price">
                    {item.price}
                  </div>
                  <div className="cell" data-title="Quantity">
                    {item.count}
                  </div>
                </div>
              );
            })}
            <div className="row" style={{ backgroundColor: "#e0a2a2" }}>
              <div className="cell" data-title="Book">
                Total
              </div>
              <div className="cell" data-title="Unit Price">
                ${totalPrice}
              </div>
              <div className="cell" data-title="Quantity">
                {calcQuantity(cartItems)}
              </div>
            </div>
          </div>

          <div className="address-container">
            <form>
              <div className="field" tabIndex="1">
                <label htmlFor="name">Your Name</label>
                <input
                  name="username"
                  type="text"
                  placeholder="e.g. john doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setAlert("");
                  }}
                  required
                />
              </div>

              <div className="field" tabIndex="2">
                <label htmlFor="email">Your Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAlert("");
                  }}
                  required
                />
              </div>

              <div className="field" tabIndex="3">
                <label htmlFor="message">Your address</label>
                <textarea
                  name="address"
                  placeholder="type here"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAlert("");
                  }}
                  required
                />
              </div>
              <button className="proceed" type="submit" onClick={handleSubmit}>
                proceed
              </button>
            </form>
          </div>
        </div>
      </Zoom>
    </Modal>
  );
};

Checkout.propTypes = {
  isCheckoutOpen: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  totalPrice: PropTypes.string,
  shouldClearCart: PropTypes.bool,
  closeCheckout: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isCheckoutOpen: state.checkout.isCheckoutOpen,
  cartItems: state.checkout.cartItems || [],
  totalPrice: state.checkout.totalPrice,
  shouldClearCart: state.checkout.shouldClearCart,
});

const mapDispatchToProps = (dispatch) => ({
  closeCheckout: () => dispatch(closeCheckout()),
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
