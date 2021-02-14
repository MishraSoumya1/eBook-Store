/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { loadBooks } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import Alert from "../components/alert/Alert";
import PropTypes from "prop-types";

const Products = lazy(() => import("../components/products/Products.jsx"));

const HomeScreen = ({ fetchBooks, books, message, isLoading, addToCart }) => {
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      {books && books.length === 0 && message && (
        <Alert
          message={message}
          isClose={() => {
            console.log("closed");
          }}
        />
      )}
      {(isLoading && <h2>Loading...</h2>) || (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="content">
            <div className="main">
              <Products products={books} addItems={(item) => addToCart(item)} />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

HomeScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("Home screen state " + JSON.stringify(state.books));
  return {
    isLoading: state.books.isLoading || false,
    books: state.books.books,
    message: state.books.message || "",
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchBooks: () => dispatch(loadBooks()),
  addToCart: (data) => dispatch(addToCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
