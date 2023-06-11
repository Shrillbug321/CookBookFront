import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../styles/product-details.css";

const FoodDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://localhost:7129/Product", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchData();
  }, []);

  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products[id];
  const [previewImg, setPreviewImg] = useState(product?.image01 || null);

  const { title, price, category, desc, image01 } = product || {};

  const relatedProduct = products.filter((item) => category === item.category);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(enteredName, enteredEmail, reviewMsg);
  };

  useEffect(() => {
    if (product && product.image01) {
      setPreviewImg(product.image01);
    } else {
      setPreviewImg(null);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            {product ? (
              <>
                <Col lg="2" md="2">
                  <div className="product__images">
                    <div
                      className="img__item mb-3"
                      onClick={() => setPreviewImg(product.image01)}
                    >
                      <img src={product.image01} alt="" className="w-50" />
                    </div>
                    <div
                      className="img__item mb-3"
                      onClick={() => setPreviewImg(product.image02)}
                    >
                      <img src={product.image02} alt="" className="w-50" />
                    </div>
                    <div
                      className="img__item"
                      onClick={() => setPreviewImg(product.image03)}
                    >
                      <img src={product.image03} alt="" className="w-50" />
                    </div>
                  </div>
                </Col>

                <Col lg="4" md="4">
                  <div className="product__main-img">
                    <img src={previewImg} alt="" className="w-100" />
                  </div>
                </Col>

                <Col lg="6" md="6">
                  <div className="single__product-content">
                    <h2 className="product__title mb-3">{title}</h2>
                    <p className="product__price">
                      Price: <span>${price}</span>
                    </p>
                    <p className="category mb-5">
                      Category: <span>{category}</span>
                    </p>
                    <button onClick={addItem} className="addTOCart__btn">
                      Add to Cart
                    </button>
                  </div>
                </Col>

                <Col lg="12">
                  <div className="tabs d-flex align-items-center gap-5 py-3">
                    <h6
                      className={` ${tab === "desc" ? "tab__active" : ""}`}
                      onClick={() => setTab("desc")}
                    >
                      Description
                    </h6>
                    <h6
                      className={` ${tab === "rev" ? "tab__active" : ""}`}
                      onClick={() => setTab("rev")}
                    >
                      Review
                    </h6>
                  </div>

                  {tab === "desc" ? (
                    <div className="tab__content">
                      <p>{desc}</p>
                    </div>
                  ) : (
                    <div className="tab__form mb-3">
                      <div className="review pt-5">
                        <p className="user__name mb-0">Łukasz Wysocki</p>
                        <p className="user__email">LW@gmail.com</p>
                        <p className="feedback__text">great product</p>
                      </div>

                      <div className="review">
                        <p className="user__name mb-0">Sebastian Dreszer</p>
                        <p className="user__email">SD@gmail.com</p>
                        <p className="feedback__text">great product</p>
                      </div>
                      <form className="form" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setEnteredName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter your email"
                            onChange={(e) => setEnteredEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form__group">
                          <textarea
                            rows={5}
                            type="text"
                            placeholder="Write your review"
                            onChange={(e) => setReviewMsg(e.target.value)}
                            required
                          />
                        </div>

                        <button type="submit" className="addTOCart__btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </Col>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Row>

          
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
