import { useState, useEffect } from 'react';
import Category from './wall/Category';

const ProductContainer = ({ selectedMenu }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8080/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => product.type === selectedMenu);

        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error('API error:', error);
      });
  }, [selectedMenu]);

  return (
    <section className='section-menu'>
      <div className="container-products">
        {products.map(product => (
          <div key={product.id} className='card-product'>
            <span>{product.name}</span>
            <div className='img-container'>
              <img src={product.image} alt={product.image} className="product-image" />
            </div>
            <span>${product.price}.00</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const MenuPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('breakfast');

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div>
      <Category onSelect={handleMenuSelect} />
      <ProductContainer selectedMenu={selectedMenu} />
    </div>
  );
};

export default MenuPage;