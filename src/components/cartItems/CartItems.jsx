import PropTypes from "prop-types";
import CartCard from "../cartCard/CartCard.jsx";
import "./cartitems.scss";

const CartItems = ({ items, removeItem }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div className="cart-container">
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            return (
              <CartCard
                key={index}
                name={item.name}
                description={item.description}
                price={item.price}
                imgsrc={item.imgsrc}
                count={item.count}
                removeItem={(data) => removeItem(data)}
              />
            );
          })}
      </div>
    </div>
  );
};
CartItems.propTypes = {
  items: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
};
export default CartItems;
