import React, { useState, useEffect } from "react";
import Modal from "../../modal";

function FromTables(props) {
  const { addtab } = props;
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [restaurantId, setRestaurantId] = useState('');
  const [numbertable, setNumbertable] = useState('');
  const [status, setStatus] = useState(null);
  const [restaurantData, setRestaurantData] = useState([]);

  function toggleForm() {
    setIsFormOpen(!isFormOpen);
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  function save(e) {
    e.preventDefault();
    if (status === null) {
      alert("Please select a status.");
      return;
    }

    fetch('http://localhost:8080/tables', {
      method: 'POST',
      body: JSON.stringify({
        restaurantId: restaurantId,
        numbertable: numbertable,
        status: status,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        addtab(data);
        setRestaurantId('');
        setNumbertable('');
        setStatus(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=> {
      fetch('http://localhost:8080/restaurants', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRestaurantData(data);
        })
        .catch((error) => {
          console.error('Failed to fetch restaurants:', error);
        });
  },[])

  return (
    <div>
      <button className="button-from" onClick={toggleForm}>
        {isFormOpen ? 'Close' : 'Add Data'}
      </button>
      {isFormOpen && (
        <Modal>
          <form className="form d-flex flex-wrap">
            <div className="form-group flex-grow-1 m-2">
            <select
                className="form-control"
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
              >
                <option value="">Select Restaurant</option>
                {restaurantData.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group flex-grow-1 m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Input NumberTable..."
                value={numbertable}
                onChange={(e) => setNumbertable(e.target.value)}
              />
            </div>
            <div className="form-group flex-grow-1 m-2">
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value === "true")}
              >
                <option value="">Select Status</option>
                <option value="false">Available</option>
                <option value="true">Not Available</option>
              </select>
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
    </div>
  );
}

export default FromTables;
