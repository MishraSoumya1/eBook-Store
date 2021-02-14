import PropTypes from "prop-types";
import "./cartCard.scss";

const CartCard = ({ name, description, imgsrc, price, count, removeItem }) => {
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={imgsrc} alt={name} style={{ width: "50%" }} />
        <div className="container">
          <h4>
            <b>{name}</b>
          </h4>
          <p>
            Price : {price} * {count}
          </p>
        </div>

        <button
          className="button"
          style={{ backgroundColor: "#d44a48", color: "#fff" }}
          onClick={(e) => {
            e.stopPropagation();
            removeItem({ name, description, imgsrc, price, count });
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

CartCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgsrc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default CartCard;
