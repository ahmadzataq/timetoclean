import React, { useEffect, useState } from "react";
// import Modal from 'react-modal';
// import { useReactToPrint } from 'react-to-print';
import { Col, Container, Row } from "reactstrap";
import "./dashboard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Profile from "./Profile";

const ProfilePic = () => {
  const [currentThumb, setThumb] = useState("");

  // GET CUSTOMER DETAILS
  const id = localStorage.getItem("cID");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`https://time-to-clean-api.vercel.app/customers/${id}`);
      setThumb(data.thumb);
    };
    fatchCustomer();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
    };
    axios
      .put(`https://time-to-clean-api.vercel.app/customers/${id}?cthumb=${currentThumb}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal mengupdate!",
        });
      });
  };

  // SHOWING UPLOADED IMAGE
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  if (!localStorage.getItem("cToken")) {
    window.location.href = "/login";
  } else {
    return (
      <>
        <Container>
          <div className="d-flex justify-content-center mb-4">
            <h2 className="text-title head-title mt-5">Settings</h2>
          </div>
          <Row>
            <Col md={4} className="mb-5">
              <Profile />
            </Col>
            <Col md={8}>
              <div className="settings">
                <form
                  enctype="multipart/form-data"
                  className="sign-up-form"
                  onSubmit={submitHandler}
                >
                  <h3
                    className="title"
                    style={{ fontFamily: "Handlee, cursive", color: "#1665a0" }}
                  >
                    Profile Picture
                  </h3>

                  {file ? (
                    <img src={file} alt="" />
                  ) : (
                    <img src={"/customers/" + currentThumb} alt="" />
                  )}

                  <div className="input-field">
                    <FontAwesomeIcon icon={faUser} className="input-fieldi" />
                    <input
                      type="file"
                      name="file"
                      id="thumb"
                      autoComplete="off"
                      onChange={handleThumbChange}
                      placeholder=" Your Name"
                    />
                  </div>

                  <button
                    className="btnz"
                    type="submit"
                    name="signup"
                    id="signup"
                    value="register"
                  >
                    Update
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default ProfilePic;
