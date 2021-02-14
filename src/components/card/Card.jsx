import { useState } from "react";
import PropTypes from "prop-types";
import "./Card.scss";
import BookDetails from "../bookDetails/BookDetails.jsx";

const Card = ({ name, description, imgsrc, price, addItem }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="card" onClick={() => setModalOpen(true)}>
        <div className="container">
          <img src={imgsrc} alt="Book Avatar" style={{ width: "50%" }} />
          <h4>
            <b>{name}</b>
          </h4>
          <p>{(description && description) || "A Textbook"}</p>
        </div>
        <div className="product-price">
          <div>{price}</div>
          <button
            className="button primary"
            onClick={(e) => {
              e.stopPropagation();
              addItem({ name, description, imgsrc, price });
            }}
          >
            Add to cart
          </button>
        </div>
      </div>

      <BookDetails
        open={isModalOpen}
        closeModal={() => setModalOpen(false)}
        name={name}
        description={description}
        imgsrc={imgsrc}
        price={price}
        addFromModal={(item) => addItem(item)}
      />
    </>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  imgsrc: PropTypes.string,
  price: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default Card;
