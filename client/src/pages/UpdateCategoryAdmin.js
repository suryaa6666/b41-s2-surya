import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';

import NavbarAdmin from '../components/NavbarAdmin';

export default function UpdateCategoryAdmin() {
  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  const [category, setCategory] = useState('');

  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await API.get('/category/' + id)
      console.log("fetch edit category", response.data.data)
      setCategory(response.data.data)
    })()
  }, [])

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.patch('/category/' + id, { name: category });
      console.log("data yang berhasil diubah", response.data.data);
      navigate('/category-admin');
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Edit Category</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input
                onChange={handleChange}
                value={category.name}
                placeholder="category"
                className="input-edit-category mt-4"
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Save
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
