import React, { useEffect, useState, useCallback } from 'react';
import '../css/categorys.css'
import FromCategory from '../../component/Card/FromCategory';

const Category = () => {
    const [categoryList, setCategoryList] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const url = `http://localhost:8080/category/`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCategoryList(data);
        } catch(error) {
            console.error('Error fetching data:' , error);
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // const handleDelete = async (id) => {
    //     try {
    //       const response = await fetch(`http://localhost:8080/category/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //       });
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       setCategoryList(categoryList.filter((category) => category.id !== id));
    //     } catch (error) {
    //       console.error('Error deleting data:', error);
    //     }
    //   };

      function addtabcat(newCategory) {
        setCategoryList((currCategory) => {
          return [...currCategory, newCategory];
        });
      }

      return (
        <div className='category-pages'>
        <h1 className='title-pages'>Data Category</h1>
        <FromCategory addtabcat={addtabcat}/>
        <table className='category-content'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th className='ac'>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td className='num'>{category.name}</td>
                <td className='button-content'>
                  <button className="delete-buttons">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );
};

export default Category;