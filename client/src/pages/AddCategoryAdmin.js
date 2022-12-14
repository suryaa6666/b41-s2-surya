import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { API } from '../config/api';

import NavbarAdmin from '../components/NavbarAdmin';

import dataCategory from '../fakeData/category';

export default function AddCategoryAdmin() {
  let navigate = useNavigate();
  const [category, setCategory] = useState('');

  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post('/category', { name: category })
      console.log("data category berhasil ditambahkan", response.data.data)
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Add Category</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input
                onChange={handleChange}
                placeholder="category"
                value={category}
                name="category"
                className="input-edit-category mt-4"
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
