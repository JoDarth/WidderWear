import React, { useEffect, useState } from "react";
import logo from "./widderfire2-1.png";
import { Link } from "react-router-dom";

function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Function to update cart count
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      const cart = savedCart ? JSON.parse(savedCart) : [];
      setCartCount(cart.length);
    };

    // Initial load
    updateCartCount();

    // Listen for storage changes (multi-tab support)
    window.addEventListener("storage", updateCartCount);

    // Optionally poll for changes (in-app updates)
    const interval = setInterval(updateCartCount, 500);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  // Determine color based on cart contents
  const cartColor = cartCount === 0 ? "red" : "green";

  return (
    <div className="container border">
      <div className="row justify-content-end">
        <div className="col-12">
          <img
            src={logo}
            alt="Widder Wear Logo"
            style={{ maxHeight: "400", width: "auto" }}
          />
        </div>
        <div className="col-2 text-center">
          <Link to="/AddMerchPage" className="btn btn-warning">Admin</Link>
        </div>
        <div className="col-2 text-center">
          <Link to="/HomePage" className="btn btn-primary">Home</Link>
        </div>
        <div className="col-2 text-center">
          <Link to="/Shop" className="btn btn-primary">Shop</Link>
        </div>
        <div className="col-2 text-center">
          <Link to="/LoginPage" className="btn btn-danger">Login</Link>
        </div>
        <div className="col-2 text-center">
          <Link
            to="/cart"
            style={{
              color: cartColor,
              fontWeight: "bold",
              border: `2px solid ${cartColor}`,
              borderRadius: "1rem",
              padding: "0.3rem 1rem",
              background: "#fff",
              textDecoration: "none",
              display: "inline-block",
              transition: "color 0.3s, border 0.3s",
            }}
          >
            🛒 Cart ({cartCount})
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
