import React, { useState, useEffect } from "react";
import Modal from "../../modal";

function FromMenu(props) {
    const { add } = props;
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [restaurantId, setRestaurantId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [stok, setStok] = useState('');

    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    function toggleForm() {
        setIsFormOpen(!isFormOpen);
      }
    
    function closeForm() {
        setIsFormOpen(false);
      }

    function save(e) {
    e.preventDefault();
    fetch('http://localhost:8080/menu', {
      method: 'POST',
      body: JSON.stringify({
        restaurantId: restaurantId,
        categoryId: categoryId,
        name: name,
        image: image,
        price: price,
        stok: stok,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        add(data);
        setRestaurantId('');
        setCategoryId('');
        setName('');
        setImage('');
        setPrice('');
        setStok('');
        setIsSaving(false);
        closeForm();
      })
      .catch((err) => {
        console.log(err);
        setIsSaving(false);
      });
  }

  useEffect(() => {
    if (!isFormOpen && !isSaving) {
    // Fetch restaurants
    fetch('http://localhost:8080/restaurants', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch restaurants:', error);
      });

    // Fetch categories
    fetch('http://localhost:8080/category', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
      });
    }
  }, [isFormOpen, isSaving]);

    return (  
          <div>
              <h1>Data Menu</h1>
              <button className="button-from" onClick={toggleForm}>
                {isFormOpen ? 'Close' : 'Add Data'}
              </button>
              {isFormOpen && !isLoading && (
                <Modal>
                  <form className="form d-flex flex-wrap">
                    <div className="form-group flex-grow-1 m-2">
                      <label htmlFor="restaurantId">Select Restaurant:</label>
                      <select
                        id="restaurantId"
                        className="form-control"
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                      >
                        <option value="">Select Restaurant</option>
                        {restaurants.map((restaurant) => (
                          <option key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group flex-grow-1 m-2">
                      <label htmlFor="categoryId">Select Category:</label>
                      <select
                        id="categoryId"
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      </div>
                    <div className="form-group flex-grow-1 m-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Input Name Menu..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div className="form-group flex-grow-1 m-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Input Image url..."
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    </div>
                    <div className="form-group flex-grow-1 m-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Input price..."
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                    <div className="form-group flex-grow-1 m-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Input Stok..."
                        value={stok}
                        onChange={(e) => setStok(e.target.value)}
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
}

export default FromMenu;