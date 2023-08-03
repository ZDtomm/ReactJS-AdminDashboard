import React, { useEffect, useState } from 'react';
import '../css/dashboard.css';

const DashboardPage = () => {
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [availableTableCount, setAvailableTableCount] = useState(0)
  const [onProcessReservationCount, setOnProcessReservationCount] = useState(0);

  async function fetchRestaurantCount(adminId) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`http://localhost:8080/restaurants/admin/${adminId}`, {
        headers: headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        setRestaurantCount(data.length);
      } else {
        const message = await response.json();
        throw new Error({ status: response.status, message: message });
      }
    } catch (error) {
      console.error('Error fetching restaurant count:', error);
    }
  }

  async function fetchAvailableTableCount(adminId) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`http://localhost:8080/tables/by-admin/${adminId}`, {
        headers: headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Data from API:', data);
        const availableTables = data.filter((table) => !table.status);
        console.log('Available Tables:', availableTables);
        setAvailableTableCount(availableTables.length);
      } else {
        const message = await response.json();
        throw new Error({ status: response.status, message: message });
      }
    } catch (error) {
      console.error('Error fetching available table count:', error);
    }
  }

  async function fetchOnProcessReservationCount(adminId) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`http://localhost:8080/reservasi/on-process/${adminId}`, {
        headers: headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        setOnProcessReservationCount(data.length);
      } else {
        const message = await response.json();
        throw new Error({ status: response.status, message: message });
      }
    } catch (error) {
      console.error('Error fetching on process reservation count:', error);
    }
  }

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (adminId) {
      fetchRestaurantCount(adminId);
      fetchAvailableTableCount(adminId);
      fetchOnProcessReservationCount(adminId);
    }
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className='dashboard-content'>
      <div className="card-dashboard">
        <div className="card-header-dashboard">
          <h2>Jumlah Restoran</h2>
        </div>
        <div className="card-body-dashboard">
          <p>{restaurantCount}</p>
        </div>
      </div>
      <div className="card-dashboard">
        <div className="card-header-dashboard">
          <h2>Total Meja Tersedia</h2>
        </div>
        <div className="card-body-dashboard">
          <p>{availableTableCount}</p>
        </div>
      </div>
      <div className="card-dashboard">
        <div className="card-header-dashboard">
          <h2>On Process Reservation </h2>
        </div>
        <div className="card-body-dashboard">
          <p>{onProcessReservationCount}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardPage;
