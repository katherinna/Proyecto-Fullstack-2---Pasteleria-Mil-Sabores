import React from "react";

export const Footer = () => {
  return (
    <footer className="footer-custom mt-4 bg-light border-top">
      <div className="container py-4">
        <div className="row align-items-start">

          {/* LOGO */}
          <div className="col-md-3 text-center text-md-start mb-3 mb-md-0">
            <img
              src="/assets/img/logo-fndo-blanco.png"
              alt="Logo"
              className="footer-logo mb-2"
              style={{ maxHeight: "80px" }}
            />
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-copy text-center mt-4 border-top pt-3">
          <p className="mb-0 small">
            By <strong>CodeLegion FKR</strong> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};