import React, { useState, useEffect } from 'react';
import CardMenu from '../../component/Card/CardMenu';
import FromMenu from '../../component/Card/FromMenu';


const MenuPage = () => {
    const [menu , setMenu] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchMenu(id) {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            let response = await fetch(`http://localhost:8080/menu/menus/by-admin/${id}`, {
                headers: headers,
            });

            if (response.status === 200) {
                let data = await response.json();
                setMenu(data);
            } else {
                let message = await response.json();
                throw new Error({ status: response.status, message: message });
            }
        } catch (error) {
            console.log(error)
        }
    }

    function add(newMenu) {
        setMenu((currMenu) => {
          return [...currMenu, newMenu];
        });
      }
    
    function deleteMenu(id) {
        setMenu((currMenu) => currMenu.filter((men) => men.id !== id));
    }

    function editMenu(updatedMenu) {
      setMenu((currMenu) => {
        const updatedMenuList = currMenu.map((men) =>
          men.id === updatedMenu.id ? updatedMenu : men
        );
        return updatedMenuList;
      });
    }

    useEffect(() => {
        const adminId = localStorage.getItem('adminId');
        if (adminId) {
          fetchMenu(adminId);
        }
      }, [menu]);

      const ITEMS_PER_PAGE = 5;
    
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const totalPages = Math.ceil(menu.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleMenu = menu.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className='menu-pages'>
            <FromMenu add={add}/>
            <table className='menu-tables'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Nama Restaurant</th>
                        <th>Nama Menu</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stok</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleMenu.map((men) => (
                        <CardMenu 
                        key={men.id}
                        cardMenu={men} 
                        deleteMenu={deleteMenu}
                        editMenu={editMenu}/>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
        <button className='button-prev' onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span className='pageMenu-control'>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className='button-next' onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
        </div>
    );
};

export default MenuPage;