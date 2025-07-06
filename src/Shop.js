import React, { useEffect, useState } from "react";

function Shop() {
  const [item, setItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await fetch("https://sheetdb.io/api/v1/x9ga5hsszcw61");
        const data = await res.json();
        if (data.length > 0) {
          const product = data[0];
          let sizesArray = [];
          if (product.hasSizes && product.sizes) {
            sizesArray = product.sizes.split(",").map(s => s.trim());
          }
          setItem({
            ...product,
            hasSizes: product.hasSizes === "TRUE" || product.hasSizes === true,
            sizes: sizesArray,
            price: parseFloat(product.price),
            inventory: parseInt(product.inventory, 10),
          });
          if (sizesArray.length > 0) {
            setSelectedSize(sizesArray[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch inventory:", err);
      }
    }

    fetchInventory();

    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    if (!item) return;
    if (item.inventory <= 0) {
      alert("Out of stock!");
      return;
    }
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
            <p className="card-text">
              <strong>In Stock:</strong> {item.inventory}
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
              disabled={item.inventory <= 0}
            >
              {item.inventory <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
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
