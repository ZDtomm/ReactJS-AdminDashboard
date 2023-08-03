import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/card.css'

function CardRestaurants(props) {
  const { cardRestaurant, deleteResto, editResto } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...cardRestaurant }); 

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer  ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        }
      });
  
      if (response.ok) {
        deleteResto(id);
      } else {
        throw new Error('Failed to delete restaurant');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit() {
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${editedData.id}`, {
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(editedData), 
      });

      if (response.ok) {
        editResto(editedData); 
        setIsEditing(false); 
      } else {
        throw new Error('Failed to edit restaurant');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <tr>
      {isEditing ? (
        <>
          <td className='in-id'>
            <input
              type="text"
              name="id"
              value={editedData.id}
              onChange={handleInputChange}
              disabled // Disable editing of the ID field
            />
          </td>
          <td className='in-img'>
            <input
              type="text"
              name="image"
              value={editedData.image}
              onChange={handleInputChange}
            />
          </td>
          <td className='in-nm'>
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
            />
          </td>
          <td className='in-adrs'>
            <input
              type="text"
              name="address"
              value={editedData.address}
              onChange={handleInputChange}
            />
          </td>
          <td className='in-opc'>
            <input
              type="text"
              name="openingTime"
              value={editedData.openingTime}
              onChange={handleInputChange}
            />{' '}
            -{' '}
            <input
              type="text"
              name="closingTime"
              value={editedData.closingTime}
              onChange={handleInputChange}
            />
          </td>
          <td className='in-btn'>
            <button className="save-button" onClick={handleEdit}>
              Save
            </button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>
            <h2 className='title'>{cardRestaurant.id}</h2>
          </td>
          <td>
            <img src={cardRestaurant.image} alt={cardRestaurant.name} className="card-img-top" />
          </td>
          <td>
            <h2 className='title'>{cardRestaurant.name}</h2>
          </td>
          <td>{cardRestaurant.address}</td>
          <td>
            {cardRestaurant.openingTime} - {cardRestaurant.closingTime}
          </td>
          <td>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDelete(cardRestaurant.id)}>
              <FontAwesomeIcon icon={faTrash} className="icon-trash" size="sm" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default CardRestaurants;
