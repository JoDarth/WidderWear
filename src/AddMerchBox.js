import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SIZE_OPTIONS = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "X-Large" },
];

function AddMerchBox() {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [hasSizes, setHasSizes] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [itemPhoto, setItemPhoto] = useState(null);
  const navigate = useNavigate();
  const handleSizeCheckbox = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setItemPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const formatPrice = (value) => {
    if (value === "" || isNaN(value)) return "";
    const num = parseFloat(value);
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePriceChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^0-9.]/g, "");
    const parts = val.split(".");
    if (parts.length > 2) {
      val = parts[0] + "." + parts.slice(1).join("");
    }
    setItemPrice(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
      desc: itemDesc,
      price: itemPrice,
      sizes: hasSizes ? selectedSizes : [],
      hasSizes,
      photo: itemPhoto,
    };
    localStorage.setItem("shopItem", JSON.stringify(newItem));
    console.log("Submitted!");
    navigate("/Shop");
  };

  return (
    <div
      className="container-border"
      style={{
        padding: "10px",
        width: "60%",
        margin: "0 auto",
        border: "3px dashed pink",
      }}
    >
      <form className="w-100" onSubmit={handleSubmit}>
        {/* Item Name */}
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label htmlFor="itemName" className="form-label mb-0">
              Item Name:
            </label>
          </div>
          <div className="col-md-9">
            <input
              name="itemName"
              id="itemName"
              className="form-control"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              type="text"
              maxLength={13}
              required
            />
          </div>
        </div>
        {/* Item Description */}
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label htmlFor="itemDesc" className="form-label mb-0">
              Item Description:
            </label>
          </div>
          <div className="col-md-9">
            <input
              name="itemDesc"
              id="itemDesc"
              className="form-control"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              type="text"
            />
          </div>
        </div>
        {/* Item Price */}
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label htmlFor="itemPrice" className="form-label mb-0">
              Item Price:
            </label>
          </div>
          <div className="col-md-9 d-flex align-items-center">
            <input
              name="itemPrice"
              id="itemPrice"
              className="form-control"
              type="text"
              inputMode="decimal"
              pattern="^\d+(\.\d{0,2})?$"
              value={itemPrice}
              onChange={handlePriceChange}
              placeholder="0.00"
              style={{ maxWidth: "120px", marginRight: "10px" }}
              required
            />
            <span>{itemPrice !== "" ? formatPrice(itemPrice) : "$0.00"}</span>
          </div>
        </div>
        {/* Has Sizes */}
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label htmlFor="hasSizes" className="form-label mb-0">
              Has Sizes?
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="checkbox"
              id="hasSizes"
              checked={hasSizes}
              onChange={(e) => {
                setHasSizes(e.target.checked);
                if (!e.target.checked) setSelectedSizes([]);
              }}
              style={{ marginRight: "8px" }}
            />
            <label
              htmlFor="hasSizes"
              style={{ color: "red", marginLeft: "4px" }}
            >
              Check if this item has sizes
            </label>
          </div>
        </div>
        {/* Size Dropdown */}
        {hasSizes && (
          <div className="row align-items-center mb-3">
            <div className="col-md-3">
              <span className="form-label mb-0" style={{ color: "red" }}>
                Select Sizes:
              </span>
            </div>
            <div className="col-md-9">
              {SIZE_OPTIONS.map((size) => (
                <div className="form-check form-check-inline" key={size.value}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`size-${size.value}`}
                    checked={selectedSizes.includes(size.value)}
                    onChange={() => handleSizeCheckbox(size.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`size-${size.value}`}
                  >
                    {size.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Item Photo */}
        <div className="row align-items-center mb-3">
          <div className="col-md-3">
            <label htmlFor="file-upload" className="form-label mb-0">
              Item Photo:
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="file-upload"
              style={{ cursor: "pointer", color: "blue" }}
            >
              Upload Item Photo
            </label>
            {itemPhoto && (
              <img
                src={itemPhoto}
                alt="Preview"
                style={{ display: "block", marginTop: 10, maxWidth: 120 }}
              />
            )}
          </div>
        </div>
        {/* Submit Button */}
        <div className="row mt-4">
          <div className="col text-end">
            <button type="submit" className="btn btn-success">
              Send this shit to sell
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddMerchBox;
