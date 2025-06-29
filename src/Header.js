import React from "react";
import logo from "./widderfire2-1.png";
import AddMerchPage from "./AddMerchPage";
import LoginPage from "./LoginPage";

function Header() {
  return (
    <div className="container border">
      <div className="row justify-content-end">
        <div className="col-12">
          <img
            src={logo}
            alt="Widder Wear Logo"
            style={{ maxHeight: "200px", width: "auto" }}
          />
        </div>
        <div className="col-2 text-center">
          <a href="/AddMerchPage" className="btn btn-warning">
            Admin
          </a>
        </div>
        <div className="col-2 text-center">
          <a href="/HomePage" className="btn btn-primary">
            Home
          </a>
        </div>
        <div className="col-2 text-center">
          <a href="/Shop" className="btn btn-primary">
            Shop
          </a>
        </div>
        <div className="col-2 text-center">
          <a href="/LoginPage" className="btn btn-danger">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
