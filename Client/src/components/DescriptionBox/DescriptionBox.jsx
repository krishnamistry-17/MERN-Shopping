import React from 'react'
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
          <div className="descriptionbox-navigator">
              <div className="descriptionbox-nav-box">Description</div>
              <div className="descriptionbox-nav-box fade">Reviews(122)</div>
          </div>
          <div className="descriptionbox-description">
              <p>An e-commerce website is an online platform that facilities the buying and selling of product or services over the internet. It serves as a virtual marketplace
                  where businesses and individual can showcase their products. Interact with customers, and conduct transactions without the need for a physical presence. E-commerce website have gained immense popularity due to their covenience
                   ,accessibility,and the global reach they offer.</p>
              <p>E-commerce website typically display product or service along with detailed description,images,prices,and any  avialable varaitions.Each product
              usually has its own dedicated page with relevent information.</p>
          </div>
    </div>
  )
}

export default DescriptionBox
