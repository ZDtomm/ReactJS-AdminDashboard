import React, { useState } from "react";
import Modal from "../../modal";
import './css/category.css'

function FromCategory(props) {
    const  { addtabcat }  = props;
    const [isFormOpen , setIsFormOpen] = useState(false);

    const [name, setName] = useState('');

    function toggleForm() {
        setIsFormOpen(!isFormOpen);
      }
    
      function closeForm() {
        setIsFormOpen(false);
      }

      function save(e) {
        e.preventDefault();
        fetch('http://localhost:8080/category', {
          method: 'POST',
          body: JSON.stringify({
            name : name,
          }),
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            addtabcat(data);
            setName('');
          })
          .catch((err) => {
            console.log(err);
          });
      }

    return (  
        <div className="from-category">
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
                placeholder="Input Name Category..."
                value={name}
                onChange={(e) => setName(e.target.value)}
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
    </div>
    );
};

export default FromCategory;