/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Alert from "../components/alert/Alert.jsx";

const MyOrders = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    document.title = "eBook Store | Orders";
    const orders = JSON.parse(localStorage.getItem("orders"));
    setCartItems((orders && orders.length > 0 && orders.reverse()) || []);
  }, []);

  return (
    <div className="content">
      <div className="main">
        {cartItems && cartItems.length === 0 && (
          <div style={{ marginBottom: "20px" }}>
            {" "}
            <Alert
              message="No Orders found"
              isClose={() => console.log("closed by user")}
            />{" "}
          </div>
        )}
        {cartItems && cartItems.length > 0 && (
          <div className="wrapper">
            <div
              style={{
                backgroundColor: "#2b4e9e",
                width: "100%",
                height: "30px",
                marginBottom: "20px",
                borderRadius: "5px",
              }}
            >
              <h2 style={{ color: "#fff" }}>Orders</h2>
            </div>
            <div className="table">
              <div className="row header blue">
                <div className="cell">Book(s)</div>
                <div className="cell">Unit Price</div>
                <div className="cell">Quantity</div>
                <div className="cell">Name</div>
                <div className="cell">Email</div>
                <div className="cell">Address</div>
                <div className="cell">Date & Time</div>
              </div>

              {cartItems.map((item, index) => {
                return (
                  <div key={index} className="row">
                    <div className="cell" data-title="Book(s)">
                      {item.books}
                    </div>
                    <div className="cell" data-title="Unit Price">
                      ${item.totalPrice}
                    </div>
                    <div className="cell" data-title="Quantity">
                      {item.count}
                    </div>
                    <div className="cell" data-title="Name">
                      {item.name}
                    </div>
                    <div className="cell" data-title="Email">
                      {item.email}
                    </div>
                    <div className="cell" data-title="Address">
                      {item.address}
                    </div>
                    <div className="cell" data-title="Date & Time">
                      {item.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
