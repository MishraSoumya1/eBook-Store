import PropTypes from "prop-types";
import "./Products.scss";
import Card from "../card/Card.jsx";

const Products = ({ products, addItems }) => {
  return (
    <div className="product-container">
      {products &&
        products.length > 0 &&
        products.map((item, index) => {
          return (
            <Card
              key={index}
              name={item.title}
              description={item.subtitle}
              price={item.price}
              imgsrc={item.image}
              addItem={(data) => {
                addItems(data);
              }}
            />
          );
        })}
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  addItems: PropTypes.func.isRequired,
};

export default Products;
