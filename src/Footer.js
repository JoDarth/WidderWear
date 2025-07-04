import React from 'react';
import logo from "./Bigkate.png";

function Footer() {
  return (
    <footer id="app-footer" className="container-border">
      <div className="row justify-content-center">
        <div className="col-2">WidderWear &copy;</div>
        <div className="col-2">CY 6030--2025 CE</div>
        <div className="col-4">
          Irish Kate, Chapter 1858 of E Clampus Vitus&reg;
        </div>
        <div className="col-1 text-center">
          <img
            src={logo}
            alt="Irish Kate Logo"
            style={{ maxHeight: "58px", width: "auto" }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
