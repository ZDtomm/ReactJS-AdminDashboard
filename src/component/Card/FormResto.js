import React, { useState, useEffect } from 'react';
import Modal from '../../modal';
import './css/form.css';

function FormRestaurants(props) {
  const { add } = props;
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
  const [openingTime, setOpen] = useState('');
  const [closingTime, setClose] = useState('');
  const [adminId, setAdminId] = useState('');

  function toggleForm() {
    setIsFormOpen(!isFormOpen);
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  function save(e) {
    e.preventDefault();
    fetch('http://localhost:8080/restaurants', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        address: address,
        image: image,
        openingTime: openingTime,
        closingTime: closingTime,
        adminId: adminId,
      }),
      headers: {
        Authorization: `Bearer  ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        add(data);
        setName('');
        setAddress('');
        setImage('');
        setOpen('');
        setClose('');
        setAdminId('');
        setIsFormOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Get the adminId from localStorage and set it in the state when the component mounts
  useEffect(() => {
    const adminIdFromLocalStorage = localStorage.getItem('adminId');
    if (adminIdFromLocalStorage) {
      setAdminId(adminIdFromLocalStorage);
    }
  }, []);

  return (
    <>
      <h1>Data Restaurant</h1>
      <button className="button-from" onClick={toggleForm}>
        {isFormOpen ? 'Close' : 'Add Data'}
      </button>
      {isFormOpen && (
        <Modal>
          <form className="form d-flex flex-wrap">
            <div className="form-group flex-grow-1 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Input Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group flex-grow-1 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Input Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group flex-grow-1 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Input Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form-group flex-grow-1 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Opening Time (e.g., 00:00:00)"
                value={openingTime}
                onChange={(e) => setOpen(e.target.value)}
              />
            </div>
            <div className="form-group flex-grow-1 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Closing Time (e.g., 00:00:00)"
                value={closingTime}
                onChange={(e) => setClose(e.target.value)}
              />
            </div>
            <div className="form-group flex-grow-1 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Admin Id"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                disabled // Disable the input to prevent editing
              />
            </div>
            <button className="btn btn-primary m-2" onClick={save}>
              Save
            </button>
            <button className="btn btn-secondary m-2" onClick={closeForm}>
              Close
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default FormRestaurants;
