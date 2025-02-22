import React from "react";

import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const customer = localStorage.getItem("cToken");

  // CUSTOMER LOGOUT
  const customerLogout = () => {
    localStorage.removeItem("cToken");
    localStorage.removeItem("cID");
    localStorage.removeItem("cName");
    window.location.href = "/";
  };

  return (
    <>
      <div className="container">
        <header className="p-0 m-0">
          <nav className="navbar navbar-expand-sm bg-whitesmoke navbar-EBEAD5 fixed-top">
            <div className="navbar-header navbar-brand">
              {/* <h2 className="mx-2 my-2">TIMETOCLEAN</h2> */}
              <Link to="/">
                <img
                  src={"default/logo.png"}
                  alt={"TIMETOCLEAN"}
                  className="ml-4"
                />
              </Link>
            </div>
            <button
              className="navbar-toggler "
              id="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                  <NavLink className="nav-link text-center " to="/">
                    <span>
                      <i className="fa fa-fw fa-home"></i>
                    </span>{" "}
                    Beranda
                  </NavLink>
                </li>
                <li className="nav-item text-light text-center text-md-left mx-2 ">
                  <NavLink className="nav-link " to="/services">
                    <span>
                      <i className="fa-solid fa-gear"></i>
                    </span>{" "}
                    Pelayanan
                  </NavLink>
                </li>
                <li className="nav-item text-center text-md-left mx-2 ">
                  <NavLink className="nav-link " to="/order">
                    <span>
                      <i className="fa-solid fa-cart-shopping"></i>
                    </span>{" "}
                    Pesanan
                  </NavLink>
                </li>                
                {!customer ? (
                  <li className="nav-item  text-center text-md-left mx-2">
                    <NavLink className="nav-link " to="/login">
                      <span>
                        <i className="fa-solid fa-right-to-bracket"></i>
                      </span>{" "}
                      Masuk
                    </NavLink>
                  </li>
                ) : (
                  <>
                    <li className="nav-item  text-center text-md-left mx-2">
                      <NavLink className="nav-link " to="/customer">
                        <span>
                          <i className="fa-brands fa-dashcube"></i>
                        </span>{" "}
                        Dasbor
                      </NavLink>
                    </li>
                    <li
                      className="nav-item  text-center text-md-left mx-2"
                      onClick={() => {
                        customerLogout();
                      }}
                    >
                      <NavLink className="nav-link " to="#">
                        <span>
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </span>{" "}
                        Keluar
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
