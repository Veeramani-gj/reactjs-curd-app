import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";

export default function Popup(props) {
  const SaveChange = () => {
    props.Popupclose();
    fetch(
      `https://65c35b2d39055e7482c0ad18.mockapi.io/veera/datas/${props.Formdata.id}`,
      {
        method: "PUT", // or PATCH
        headers: { "content-type": "application/json" },
        body: JSON.stringify(props.Formdata),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        // Do something with updated task
       
        props.UpdateData(!props.Update);
      })
      .catch((error) => {
        // handle error
      });
  };
  const AddData = () => {
    props.Popupclose();
    fetch("https://65c35b2d39055e7482c0ad18.mockapi.io/veera/datas", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Send your data in the request body as JSON
      body: JSON.stringify(props.Formdata),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
        // do something with the new task
        props.UpdateData(!props.Update);
        toast.success('DATA ADDED SUCCESFULLY 🥰')
        
      })
      .catch((error) => {
        // handle error
      });
  };
  return (
    <>
      <Modal show={props.Show} onHide={props.Popupclose}>
        <Modal.Header closeButton>
          <Modal.Title>DATA OF COMPANY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                defaultValue={props.Formdata.name}
                onChange={(e) =>
                  props.FormsetData({ ...props.Formdata, name: e.target.value })
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter your Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={props.Formdata.email}
                onChange={(e) =>
                  props.FormsetData({
                    ...props.Formdata,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Your Phone No</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Your Phone No"
                defaultValue={props.Formdata.phoneNo}
                onChange={(e) =>
                  props.FormsetData({
                    ...props.Formdata,
                    phoneNo: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Your Qualification</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Qualification"
                defaultValue={props.Formdata.Qualification}
                onChange={(e) =>
                  props.FormsetData({
                    ...props.Formdata,
                    Qualification: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Your Location</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Location"
                defaultValue={props.Formdata.Location}
                onChange={(e) =>
                  props.FormsetData({
                    ...props.Formdata,
                    Location: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.Popupclose}>
            Close
          </Button>
          {props.Formdata.id == null ? (
            <Button variant="primary" onClick={AddData}>
              Add Data
            </Button>
          ) : (
            <Button variant="primary" onClick={SaveChange}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
       
      </Modal>
    </>
  );
}
