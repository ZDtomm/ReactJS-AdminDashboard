import React, { useState, useEffect }from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './css/cardmenu.css'

function CardMenu(props) {
    const {cardMenu, deleteMenu, editMenu } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...cardMenu }); 
    const [categories, setCategories] = useState([]);

    async function handleDelete(id) {
        try {
          const response = await fetch(`http://localhost:8080/menu/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer  ${localStorage.getItem('token')}`,
              'Content-type': 'application/json',
            }
          });
      
          if (response.ok) {
            deleteMenu(id);
          } else {
            throw new Error('Failed to delete Menu');
          }
        } catch (error) {
          console.log(error);
        }
      }

      async function handleEdit() {
        try {
          const response = await fetch(`http://localhost:8080/menu/${editedData.id}`, {
            method: 'PUT', 
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-type': 'application/json',
            },
            body: JSON.stringify(editedData), 
          });
    
          if (response.ok) {
            editMenu(editedData); 
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
        if (name === "category") {
          const selectedCategory = categories.find((category) => category.id === parseInt(value));
          setEditedData((prevData) => ({
            ...prevData,
            [name]: selectedCategory,
          }));
        }  else {
        setEditedData((prevData) => ({
          ...prevData,
          [name]: value,
          }));
        } 
      }

      
      function formatToRupiah(price) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    }

    useEffect(() => {
      async function fetchCategories() {
        try {
          const token = localStorage.getItem('token');
            const headers = {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            };
          let response = await fetch("http://localhost:8080/category", {
            headers: headers,
          });
            if (response.ok) {
              const data = await response.json();
              setCategories(data);
            } else {
              throw new Error("Failed to fetch categories");
            }
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchCategories();
    }, []);

    if (!cardMenu || !cardMenu.category || !cardMenu.restaurant) {
      return null;
  }

    return (
      <tr>
      {isEditing ? (
        <>
          <td className="ip-id">
            <input
              type="text"
              name="id"
              value={editedData.id}
              onChange={handleInputChange}
              disabled 
            />
          </td>
          <td className="ip-img">
            <input
              type="text"
              name="image"
              value={editedData.image}
              onChange={handleInputChange}
            />
          </td>
          <td className="ip-resto">
            <input
              type="text"
              name="address"
              value={editedData.restaurant.name}
              onChange={handleInputChange}
              disabled
            />
          </td>
          <td className="ip-nm">
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
            />
          </td>
          <td className="ip-cnm">
          <select
              name="category"
              value={editedData.category.id}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </td>
          <td className="ip-prc">
            <input
              type="text"
              name="price"
              value={editedData.price}
              onChange={handleInputChange}
            />
          </td>
          <td className="ip-stk">
            <input
              type="text"
              name="stok"
              value={editedData.stok}
              onChange={handleInputChange}
            />
          </td>
          <td className="ip-btn">
            <button className="sv-button" onClick={handleEdit}>
              Save
            </button>
            <button className="cncl-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>
            <h2 className="title">{cardMenu.id}</h2>
          </td>
          <td>
            <img src={cardMenu.image} alt={cardMenu.name} className="card-img-top" />
          </td>
          <td>
            <h2 className="title">{cardMenu.restaurant.name}</h2>
          </td>
          <td>{cardMenu.name}</td>
          <td>{cardMenu.category.name}</td>
          <td>{formatToRupiah(cardMenu.price)}</td>
          <td>{cardMenu.stok}</td>
          <td>
          <button className="edt-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDelete(cardMenu.id)}>
              <FontAwesomeIcon icon={faTrash} className="icon-trash" size="sm" />
            </button>
          </td>
        </>
      )}
    </tr>
      );
}

export default CardMenu;