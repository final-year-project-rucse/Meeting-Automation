import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

const Committee = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ data: [] });
  const [query, setQuery] = useState("redux");
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const [modelShow, setModelShow] = useState(false);
  const [createCommitteLoading, setCreateCommitteLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [committeeLoading, setCommitteLoading] = useState(true);
  const [options, setOptions] = useState([
    { name: "Select a head", email: "" },
  ]);

  const [index, setInput] = useState(0);
  const handleSubmit = async (event) => {
    // setCreateCommitteLoading(true);
    event.preventDefault();
    const data = {
      title: title,
      presidentName: options[index].name,
      email: options[index].email,
    };

    await axios
      .post("http://localhost:8000/api/addcommittee", data)
      .then((res) => {
        console.log(res);
        setCreateCommitteLoading(false);
        handleClose();
        setTitle("");
        setInput(0);
        fetchData();
      })
      .catch((err) => {
        console.log(err.response);
        setCreateCommitteLoading(false);
      });
  };

  const handleClose = () => setModelShow(false);
  const handleShow = () => setModelShow(true);

  const fetchData = async () => {
    setCommitteLoading(true);
    try {
      const result = await axios.get("http://localhost:8000/api/committees", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setData(result.data);
      setCommitteLoading(false);
    } catch (err) {
      console.log(err.response);
      setCommitteLoading(false);
    }
  };

  useEffect(() => {
    setCommitteLoading(true);

    fetchData();
  }, []);

  useEffect(() => {
    const url = "http://localhost:8000/api/admin/teachers";
    const fetchData = async () => {
      const response = await axios.get(url);
      var arr = [];
      arr = options.concat(response.data.data);
      setOptions(arr);
    };
    fetchData();
  }, []);

  return (
    <>
      <>
        <Modal show={modelShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Committee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Committee Name</Form.Label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                autoFocus
                placeholder="Committee Name"
              />
              <select
                value={index}
                className="form-select my-3 mt-4"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              >
                {options.map((obj, index) =>
                  index === 0 ? (
                    <option key={index} value={index} defaultValue hidden>
                      {obj.name}{" "}
                    </option>
                  ) : (
                    <option key={index} value={index}>
                      {obj.name}{" "}
                    </option>
                  )
                )}
              </select>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={createCommitteLoading}
            >
              {createCommitteLoading && (
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="admin_navigation_container">
        <div className="container">
          <div className="admin_content">
            <div className="admin_logo_content">
              <p className="me-5">LOGO</p>
              <p onClick={handleShow} className="admin_create_committe py-3">
                Create Committee
              </p>
            </div>
            <div className="">
              <button
                onClick={() => {
                  localStorage.setItem("token", null);
                  navigate("/admin");
                }}
                className="btn btn-outline-warning "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <header className="topbar">
          {/* <div className="logo">
            <a href="/committees" className="mylogo text">
              Logo
            </a>
          </div> */}
          {/* <nav className="navigation">
            <ul>
              <li onClick={handleShow}>Create committee</li>
            </ul>
          </nav>
          <nav className="president">
            <button onClick={() => setShow(!show)}>Admin profile</button>
            {show && (
              <div className="dropdown-content">
                <ul>
                  <li>
                    <a className="dropdown-content_a" href="/admin/setting">
                      Setting
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        localStorage.setItem("token", null);
                        navigate("/admin");
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </nav> */}
        </header>

        {/* <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        /> */}
        {committeeLoading ? (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border mt-5"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th scope="col">Committee No.</th>
                <th scope="col">Committees</th>
                <th scope="col">Head Name</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => (
                <TableRow key={index} item={item} index={index + 1} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Committee;
