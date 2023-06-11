import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

//import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";

const AllFoods = () => {
  const [products, setProducts] = useState([{
    id: "01",
    title: "Chicken Burger",
    price: 24.0,
    image01: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413210/my-uploads/product_01.1_dxyihb.jpg',
    image02: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413219/my-uploads/product_01_u8tkvq.jpg',
    image03: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413216/my-uploads/product_01.3_m2cvrj.jpg',
    category: "Burger",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
  },{
    id: "02",
    title: "Vegetarian Pizza",
    price: 115.0,
    image01: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413210/my-uploads/product_01.1_dxyihb.jpg',
    image02: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413219/my-uploads/product_01_u8tkvq.jpg',
    image03: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413216/my-uploads/product_01.3_m2cvrj.jpg',
    category: "Pizza",

    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  },

  {
    id: "03",
    title: "Double Cheese Margherita",
    price: 110.0,
    image01: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413210/my-uploads/product_01.1_dxyihb.jpg',
    image02: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413219/my-uploads/product_01_u8tkvq.jpg',
    image03: 'https://res.cloudinary.com/dmlknkq2t/image/upload/v1686413216/my-uploads/product_01.3_m2cvrj.jpg',
    category: "Pizza",

    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque.",
  }]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://localhost:7129/Product', {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
        }

        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              
            </Col>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
