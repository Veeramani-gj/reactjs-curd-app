import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Popup from "./popup";
import { ToastContainer, toast } from 'react-toastify';
export default function Crud() {
  const [apidata, apiResponsce] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [update, updataData] = useState(false);
  // const [newData,setnewData] = useState([])
  const [Formdata, FormsetData] = useState({
    id: null,
    name: null,
    phoneNo: null,
    email: null,
    Qualification: null,
    Location: null,
  });
  const handleShow = (item) => {
    setShow(true);
    FormsetData({
      id: item.id,
      name: item.name,
      phoneNo: item.phoneNo,
      email: item.email,
      Qualification: item.Qualification,
      Location: item.Location,
    });
  };
  const DataAdd = () => {
    setShow(true);
    FormsetData({
      id: null,
      name: null,
      phoneNo: null,
      email: null,
      Qualification: null,
      Location: null,
    });
  };
  useEffect(() => {
    fetch("https://65c35b2d39055e7482c0ad18.mockapi.io/veera/datas", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // Do something with the list of tasks
        apiResponsce(tasks);
      })
      .catch((error) => {
        // handle error
      });
  }, [update]);
  const DeleteData = (del) => {
    fetch(`https://65c35b2d39055e7482c0ad18.mockapi.io/veera/datas/${del.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        // Do something with deleted task
        updataData(!update);
        toast.error('DELETED SUCCESFULLY 🥰')
      })
      .catch((error) => {
        // handle error
      });
  };
  return (
    <>
      <h1>CRUD APPLICATION</h1>
      <Button onClick={DataAdd}>ADD DATA</Button>
      <Table striped bordered hover variant="warning">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Qualification</th>
            <th>Location</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {apidata.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNo}</td>
                <td>{item.Qualification}</td>
                <td>{item.Location}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button variant="primary" onClick={() => handleShow(item)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => DeleteData(item)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Popup
        Show={show}
        Popupclose={handleClose}
        Popupshow={handleShow}
        Formdata={Formdata}
        FormsetData={FormsetData}
        Update={update}
        UpdateData={updataData}
      />
      
    </>
  );
}
