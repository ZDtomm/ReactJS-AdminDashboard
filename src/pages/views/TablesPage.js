import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../css/tables.css'
import FromTables from '../../component/Card/FromTable';

const TableMeja = () => {
  const [mejaList, setMejaList] = useState([]);
  const [restaurantId, setrestaurantId] = useState('');
  const adminId = localStorage.getItem('adminId');

  const fetchData = useCallback(async () => {
    try {
      const url = `http://localhost:8080/tables/by-admin/${adminId}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setMejaList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [adminId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async () => {
    // Perform search based on restaurantId
    try {
      const url = `http://localhost:8080/tables/table/${restaurantId}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setMejaList(data);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/tables/change/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update the status in the mejaList state
      setMejaList((prevMejaList) =>
      prevMejaList.map((meja) => (meja.id === id ? { ...meja, status: newStatus } : meja))
    );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/tables/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setMejaList(mejaList.filter((meja) => meja.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };


  function addtab(newTable) {
    setMejaList((currTable) => {
      return [...currTable, newTable];
    });
  }

  return (
    <div className='tables-pages'>
      <h1 className='title-page'>Data Tables</h1>
      <FromTables addtab={addtab}/>
      <div className='search-resto'>
        <input
          type="text"
          placeholder="Search Id Restaurant..."
          value={restaurantId}
          onChange={(e) => setrestaurantId(e.target.value)}
        />
         <button className='search-icon' onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <table className='tables-content'>
        <thead>
          <tr>
            <th>Nama Restaurant</th>
            <th>No.Tables</th>
            <th className='st'>status</th>
            <th className='ac'>Action</th>
          </tr>
        </thead>
        <tbody>
          {mejaList.map((meja) => (
            <tr key={meja.id}>
              <td>{meja.restaurant.name}</td>
              <td className='num'>{meja.numbertable}</td>
              <td className='stat'>{meja.status ? 'not available' : 'Available'}</td>
              <td className='button-parent'>
                <button className="change-status-button" onClick={() => handleChangeStatus(meja.id, !meja.status)}>
                Change Status </button>
                <button className="delete-button" onClick={() => handleDelete(meja.id)}>
                <FontAwesomeIcon icon={faTrash} className="icon-trash" size="sm" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMeja;
