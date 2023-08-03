import React, { useEffect, useState } from 'react';
import CardReservation from '../../component/Card/CardReservation';
import '../css/reservation.css'

const Reservation = () => {
    const [reservationList, setReservationList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchReservation(id) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            };
            let response = await fetch(`http://localhost:8080/reservasi/admin/${id}`, {
            headers: headers,
            });

            if (response.status === 200) {
                let data = await response.json();
                setReservationList(data);
            } else {
                let message = await response.json();
                throw new Error({ status: response.status, message: message });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        const adminId = localStorage.getItem('adminId');
        if (adminId) {
          fetchReservation(adminId);
        }
    },[])

    const ITEMS_PER_PAGE = 5;
    
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const totalPages = Math.ceil(reservationList.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleReservasi = reservationList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const changeStatusOrder = async (orderId, newStatus) => {
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          const response = await fetch(`http://localhost:8080/reservasi/${orderId}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({ status: newStatus }),
          });
    
          if (response.status === 200) {
            fetchReservation(localStorage.getItem('adminId'));
          } else {
            const message = await response.json();
            throw new Error({ status: response.status, message: message });
          }
        } catch (error) {
          console.log(error);
        }
      };

    return ( 
        <div className="reservation-page">
            <h1>Data Reservation</h1>
            <table className="reservation-table">
            <thead>
                <tr>
                <th className='a'>Id</th>
                <th className='a'>Name</th>
                <th className='a'>Date</th>
                <th className='a'>Time Dine in</th>
                <th className='a'>Number Seat</th>
                <th className='a'>Total Price</th>
                <th className='a'>Payment Status</th>
                <th className='a'>Reservation Status</th>
                <th className='a'>Action</th>
                </tr>
            </thead>
            <tbody>
                {visibleReservasi.map((res) => (
                <CardReservation
                key={res.id} 
                cardReservation={res}
                changeStatusOrder={changeStatusOrder}/>
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

export default Reservation;