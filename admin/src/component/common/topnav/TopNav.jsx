import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./topnav.css";

const TopNav = () => {
  // GET ADMIN DETAILS
  const id = localStorage.getItem("aID");
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/users/${id}`);
      setAdmin(data);
    };
    fatchAdmin();
  }, [admin]);

  const logout = () => {
    localStorage.removeItem("aToken");
    localStorage.removeItem("aID");
    window.location.href = "https://timetoclean.vercel.app";
  };

  return (
    <>
      <section className="top-nav">
        <div className="top-nav-wrapper">
          <div className="top-nav-right">
            <ul>
              <li>
                <Link to="/" title="Home">
                  <i class="ri-home-4-line"></i>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    logout();
                  }}
                  title="Logout"
                >
                  <i className="ri-logout-circle-r-line"></i>
                </Link>
              </li>
            </ul>

            <div className="topnav-profile-img">
              <Link to="profile" title="Profile">
                <span className="badge">{admin.username}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopNav;
