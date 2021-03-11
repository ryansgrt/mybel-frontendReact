import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import IndexHeader from "../../components/Headers/IndexHeader.js";
import DarkFooter from "../../components/Footers/DarkFooter.js";

import Carousel from "./Carousel.js";

import CarouselPromo from "./PromoCarousel";
import ProductList from "./ProductList";
import Category from "./Category";
import MessageForm from "./MessageForm";
import DesignList from "./DesignList";
import DesignCategory from "./DesignCategory";
import {withRouter} from "react-router";

function Index() {

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <Category />
          <DesignCategory/>
          <CarouselPromo/>
          {/*<Carousel />*/}

          <ProductList />
          <br></br>
          <br></br>
          <br></br>
          <DesignList />

          <MessageForm/>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}


export default Index;
