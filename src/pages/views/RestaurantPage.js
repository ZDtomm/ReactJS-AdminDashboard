import React, { useState, useEffect } from 'react';
import CardRestaurants from '../../component/Card/CardRestaurants';
import FormRestaurants from '../../component/Card/FormResto';
import '../../component/Card/css/card.css';

const RestaurantPage = () => {
  const [resto, setResto] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchRestaurant(id) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      let response = await fetch(`http://localhost:8080/restaurants/admin/${id}`, {
        headers: headers,
      });

      if (response.status === 200) {
        let data = await response.json();
        setResto(data);
      } else {
        let message = await response.json();
        throw new Error({ status: response.status, message: message });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function add(newResto) {
    setResto((currResto) => {
      return [...currResto, newResto];
    });
  }

  function deleteResto(id) {
    setResto((currResto) => currResto.filter((res) => res.id !== id));
  }

  function editResto(updatedResto) {
    setResto((currResto) => {
      const updatedRestoList = currResto.map((res) =>
        res.id === updatedResto.id ? updatedResto : res
      );
      return updatedRestoList;
    });
  }

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (adminId) {
      fetchRestaurant(adminId);
    }
  }, []);

  const ITEMS_PER_PAGE = 5;
    
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const totalPages = Math.ceil(resto.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleResto = resto.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="restaurant-page">
      <FormRestaurants add={add} />
    <table className="restaurant-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Image</th>
          <th>Name</th>
          <th>Address</th>
          <th>Opening Time - Closing Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {visibleResto.map((res) => (
          <CardRestaurants 
          key={res.id} 
          cardRestaurant={res} 
          deleteResto={deleteResto}
          editResto={editResto} />
        ))}
      </tbody>
    </table>
    <div className="pagination">
        <button className='button-prev' onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span className='page-control'>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className='button-next' onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
  </div>
  );
}

export default RestaurantPage;

