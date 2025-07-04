import React, { useEffect, useState } from "react";

function Shop() {
  const [item, setItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  
  // Load item and cart from localStorage on mount
  useEffect(() => {
    const shopItem = localStorage.getItem("shopItem");
    if (shopItem) {
      const parsedItem = JSON.parse(shopItem);
      setItem(parsedItem);
      // Set default selected size if sizes exist
      if (parsedItem.hasSizes && parsedItem.sizes && parsedItem.sizes.length > 0) {
        setSelectedSize(parsedItem.sizes[0]);
      }
    }
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!item) return;
    const cartItem = {
      name: item.name,
      price: parseFloat(item.price),
      size: item.hasSizes ? selectedSize : null,
    };
    setCart(prev => [...prev, cartItem]);
    alert("Added to cart!");
  };

  return (
    <div className="container mt-4">
      <h1>Shop</h1>
      {!item ? (
        <div>No items yet.</div>
      ) : (
        <div className="card" style={{ maxWidth: 400, margin: "2rem auto" }}>
          {item.photo && (
            <img
              src={item.photo}
              alt={item.name}
              className="card-img-top"
              style={{ maxHeight: 200, objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.desc}</p>
            <p className="card-text">
              <strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}
            </p>
            {item.hasSizes && item.sizes && item.sizes.length > 0 && (
              <div className="mb-2">
                <label htmlFor="shop-size-select" className="form-label">
                  Size:
                </label>
                <select
                  id="shop-size-select"
                  className="form-select"
                  style={{ maxWidth: 180 }}
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                >
                  {item.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className="btn btn-warning w-100 mt-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      {/* (Optional) Show cart contents for debugging */}
      {cart.length > 0 && (
        <div className="mt-4">
          <h5>Cart:</h5>
          <ul>
            {cart.map((ci, idx) => (
              <li key={idx}>
                {ci.name} - ${ci.price.toFixed(2)}
                {ci.size && ` - Size: ${ci.size}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Shop;
