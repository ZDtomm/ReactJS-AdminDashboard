import React, { useState, useEffect } from 'react';
import './css/cardReservation.css'
import Modal from "../../modal";

function CardReservation(props) {
    const { cardReservation, changeStatusOrder } = props;
    const [newStatus, setNewStatus] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showDetailPopup, setShowDetailPopup] = useState(false);
    const [showDetailPopup1, setShowDetailPopup1] = useState(false);

    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
      };
    
      const handleStatusUpdate = (event) => {
        event.preventDefault();
        if (newStatus.trim() !== '') {
          changeStatusOrder(cardReservation.id, newStatus);
          setNewStatus('');
          closePopup();
        }
      };

      const openPopup = () => {
        setShowPopup(true);
      };
    
      const closePopup = () => {
        setShowPopup(false);
      };

      const openDetailPopup = () => { // Added function for opening the detail popup
        setShowDetailPopup(true);
      };

      const closeDetailPopup = () => { // Added function for closing the detail popup
        setShowDetailPopup(false);
      };

      const openDetailPopup1 = () => { // Added function for opening the detail popup
        setShowDetailPopup1(true);
      };

      const closeDetailPopup1 = () => { // Added function for closing the detail popup
        setShowDetailPopup1(false);
      };

      function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
      }


  const confirmPayment = () => {
    const reservationId = cardReservation.id;
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    fetch(`http://localhost:8080/payment`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const paymentData = data.find((payment) => payment.reservationId === reservationId);

        if (paymentData) {
          // Update the payment status
          const updatedPayment = { ...paymentData, paymentStatus: 'pembayaran selesai' };
          fetch(`http://localhost:8080/payment/${paymentData.id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(updatedPayment),
          })
            .then((response) => response.json())
            .then((updatedPaymentData) => {
              closeDetailPopup();
            })
            .catch((error) => {
              console.error('Failed to update payment:', error);
            });
        } else {
          console.error('Payment data not found for reservationId:', reservationId);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch payment data:', error);
      });
  };
    
  useEffect(() => {
  }, [cardReservation]);

    return (
        <tr>
        <td>
            <h2 className='title'>{cardReservation.id}</h2>
          </td>
          <td>
            <h2 className='title'>{cardReservation.userName}</h2>
          </td>
          <td>
            <h2 className='date'>{formatDate(cardReservation.transactionDate)}</h2>
          </td>
          <td>
            <h2 className='title'>{cardReservation.timeDineIn}</h2>
          </td>
          <td>
            <h2 className='title'>{cardReservation.mejaId}</h2>
          </td>
          <td>
            <h2 className='title'>{cardReservation.totalOrder}</h2>
          </td>
          <td>
            <h2 className='title'>{cardReservation.paymentStatus}</h2>
          </td>
          <td>
            <h2 className='title'>{cardReservation.status}</h2>
          </td>
          <td>
            <div>
            <button onClick={openPopup}>Change Status</button>
            {showPopup && (
              <Modal>
              <div className="popup">
                <form onSubmit={handleStatusUpdate}>
                  <label htmlFor="status">Select Status:</label>
                  <select id="status" value={newStatus} onChange={handleStatusChange}>
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="canceled">Canceled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button type="submit">Update Status</button>
                  <button type="button" onClick={closePopup}>Cancel</button>
                </form>
              </div>
              </Modal>
            )}
            <div>
                <button onClick={openDetailPopup}>Detail Pesanan</button>
                {showDetailPopup && (
                  <Modal>
                <div className="popup">
                    <h3>Menu Details</h3>
                    <table>
                    <thead>
                        <tr>
                        <th>Menu Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cardReservation.menuDetails.map((menu, index) => (
                        <tr key={index}>
                            <td>{menu.menuName}</td>
                            <td>{menu.price}</td>
                            <td>{menu.quantity}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    <button onClick={closeDetailPopup}>Close</button>
                </div>
                </Modal>
                )}
            </div>
            <div>
          <button onClick={openDetailPopup1}>Check Pembayaran</button>
          {showDetailPopup1 && (
            <Modal>
              <div className="popup">
                <h3>Payment Details</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Payment Image</th>
                      <th>Total Order</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src={cardReservation.paymentImg}
                          alt="Payment"
                          style={{ maxWidth: '150px', maxHeight: '150px' }}
                        />
                      </td>
                      <td>{cardReservation.totalOrder}</td>
                      <td>
                        <button
                         onClick={confirmPayment}>Confirm Payment </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={closeDetailPopup1}>Close</button>
              </div>
            </Modal>
          )}
        </div>
          </div>
        </td>
        </tr>
      );
}

export default CardReservation;