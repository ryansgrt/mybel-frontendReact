/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 911) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 6;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
      <div className="page-header clear-filter" filter-color="blue">
        <div
    className="page-header-image"
    style={{
        backgroundImage: "url(" + require("../../assets/img/build.jpg") + ")"
    }}
    ref={pageHeader}
    />
        <Container>
          <div className="content-center brand">
            <img
    alt="..."
    className="n-logo"
    src={require("../../assets/img/now-logo.png")}
    />
            <h1 className="h1-seo">Mybel</h1>
            <h3>Mybel for my room</h3>
          </div>
        </Container>
      </div>
  );
}

export default IndexHeader;
