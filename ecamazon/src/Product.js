import React, { useEffect, useState } from 'react';
import './Product.css'; // Import your CSS file for styling
import { useShopContext } from './shop-context'; // Import useShopContext from shop-context.js

const Product = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useShopContext();

  useEffect(() => {
    // Fetch products from your API when the component mounts
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set the fetched products to state
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Product added to cart:', product); // Log the added product
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-box">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <img src={product.image_url} alt={product.name} className="product-image" />
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Product;
