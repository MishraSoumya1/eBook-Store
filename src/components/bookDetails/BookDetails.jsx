import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { openCheckout } from "../../actions/checkoutAction";
import { convertCurrency } from "../../util";

const BookDetails = ({
  open,
  closeModal,
  name,
  description,
  imgsrc,
  price,
  addFromModal,
  openCheckout,
}) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      appElement={document.getElementById("root")}
    >
      <Zoom>
        <button className="close-modal" onClick={closeModal}>
          x
        </button>
        <div className="product-details">
          <div style={{ display: "flex" }}>
            <div style={{ flex: 2 }}>
              <img src={imgsrc} alt={name}></img>
            </div>
            <div style={{ flex: 3 }}>
              <div className="product-details-description">
                <h1>{name}</h1>
                <p>{description ? description : "A Textbook"}</p>
              </div>
            </div>
          </div>
          <div className="product-price">
            <div>Price : {price}</div>
            <button
              className="button primary"
              style={{ margin: "10px" }}
              onClick={() => {
                addFromModal({ name, description, imgsrc, price });
                closeModal();
              }}
            >
              Add To Cart
            </button>
            <button
              className="button primary"
              style={{ margin: "10px" }}
              onClick={() => {
                closeModal();
                openCheckout({
                  cartItems: [{ name, description, imgsrc, price, count: 1 }],
                  totalPrice: convertCurrency(price).toFixed(2),
                  shouldClearCart: false,
                });
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </Zoom>
    </Modal>
  );
};

BookDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgsrc: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  addFromModal: PropTypes.func.isRequired,
  openCheckout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openCheckout: (data) => {
    dispatch(openCheckout(data));
  },
});

export default connect(null, mapDispatchToProps)(BookDetails);
