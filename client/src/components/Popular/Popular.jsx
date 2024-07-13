import React from 'react';
import './Popular.css';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const Popular = () => {

  // Function to format currency to Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="wrapper">
        <div className="container">
          <div className="row">
            {data_product.map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="popular-item img-resize">
                  <Item
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={formatCurrency(item.new_price)} // Format new_price to INR
                    old_price={formatCurrency(item.old_price)} // Format old_price to INR
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popular;
