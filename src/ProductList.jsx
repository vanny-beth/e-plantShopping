import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20"
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14"
        }
      ]
    }
    // Add other categories (you already have them, so I’m omitting for brevity)
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        name: plant.name,
        image: plant.image,
        cost: plant.cost, // keep cost as a string like "$15"
        quantity: 1
      })
    );
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const navbarStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const navLinksStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const linkStyle = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  return (
    <div>
      <div className="navbar" style={navbarStyle}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={navLinksStyle}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={linkStyle}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={linkStyle}>
              <h1 className="cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) =>
            category.plants.map((plant, index) => (
              <div key={index} className="product-card">
                <img src={plant.image} alt={plant.name} className="product-image" />
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <p>
                  <strong>Cost:</strong> {plant.cost}
                </p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.name]}
                  className="add-button"
                >
                  {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
