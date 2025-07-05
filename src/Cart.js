import React, { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Remove item from cart
  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, idx) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                <span>
                  {item.name} - ${item.price.toFixed(2)}
                  {item.size && ` - Size: ${item.size}`}
                </span>
                <button className="btn btn-sm btn-danger" onClick={() => handleRemove(idx)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary" onClick={handleClearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
