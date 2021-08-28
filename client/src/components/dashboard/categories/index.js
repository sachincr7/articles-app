import React, { useEffect } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import AddCategories from "./addCategory";
import { useDispatch, useSelector } from "react-redux";

import { Table, Row, Col } from "react-bootstrap";
import { getCategories } from "../../../store/actions/article_actions";

const Categories = () => {
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <AdminLayout section="Categories">
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {articles.categories
                ? articles.categories.map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Col>
        <Col>
          <AddCategories />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Categories;
