import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import convertRupiah from 'rupiah-format';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';

import Navbar from '../components/Navbar';

import dataProduct from '../fakeData/product';

export default function DetailProduct() {
  let navigate = useNavigate();
  let { id } = useParams();

  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get('/product/' + id)
    console.log("berhasil ambil data", response.data.data)
    return response.data.data
  })

  const handleBuy = useMutation(async () => {
    try {
      const data = {
        productId: product.id,
        sellerId: product.user.id,
        price: product.price,
      };

      await API.post('/transaction', data);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md="2"></Col>
          <Col md="3">
            <img src={product?.image} className="img-fluid" />
          </Col>
          <Col md="5">
            <div className="text-header-product-detail">{product?.name}</div>
            <div className="text-content-product-detail">
              Stock : {product?.qty}
            </div>
            <p className="text-content-product-detail mt-4">{product?.desc}</p>
            <div className="text-price-product-detail text-end mt-4">
              {convertRupiah.convert(product?.price)}
            </div>
            <div className="d-grid gap-2 mt-5">
              <button className="btn btn-buy" onClick={() => handleBuy.mutate()}>Buy</button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
