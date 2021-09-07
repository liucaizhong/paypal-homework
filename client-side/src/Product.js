import React from 'react';
import { Card } from 'antd';
import './Product.css';

const Product = ({
  info,
}) => {
  const { name, price, amount, desc } = info;

  return (
    <Card
      cover={
        <img
          alt="swing-man"
          src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d5de8897-3235-4f82-9e54-6205bb036e4e/2020-%E8%B5%9B%E5%AD%A3%E6%B4%9B%E6%9D%89%E7%9F%B6%E6%B9%96%E4%BA%BA%E9%98%9F-statement-edition-jordan-nba-swingman-jersey-%E7%94%B7%E5%AD%90%E7%90%83%E8%A1%A3-LtTtfH.png"
          style={{ objectFit: 'contain' }}
        />
      }
    >
      <Card.Meta
        title={
          <div className="product-info">
            <div>{name}</div>
            <div>
              <div>${price}</div>
              <div className="item-number">x{amount}</div>
            </div>
          </div>
        }
        description={desc}
      />
    </Card>
  )
};

export default Product;
