import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../api/products";
import Navbar from "../components/Navbar";
import { selectProducts } from "../redux/products/productSlice";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import PropTypes from "prop-types";

const selected = {
  "/checkout": 0,
  "/inventory": 1,
};

export default function Layout(props) {
  console.log("using layout");
  const { route, pages } = props;
  const dispatch = useDispatch();
  const { getProductsStatus } = useSelector(selectProducts);
  const theme = useTheme();

  let content;

  switch (getProductsStatus) {
    case "loading":
      content = (
        <img
          src="https://drive.google.com/uc?export=view&id=13X_k1mXcQqW5rvyjAY7b0lJCvp1r9R9Q"
          style={theme.fullPageImageStyle}
        />
      );
      break;
    case "succeeded":
      content = (
        <Box sx={theme.mainContentStyle}>
          <Navbar selected={selected[route.location.pathname]} pages={pages} />
          <Box sx={theme.rightSideContentStyle}>
            <Outlet />
          </Box>
        </Box>
      );
      break;
    case "failed":
      content = (
        <img
          src="https://drive.google.com/uc?export=view&id=1QFaeBN-2M4TX2v9RIuoez2PrOQL6zp8o"
          style={theme.fullPageImageStyle}
        />
      );
      break;
    default:
      content = <></>;
  }

  useEffect(() => {
    if (getProductsStatus === "idle") dispatch(getProducts());
    console.log(getProductsStatus);
  }, [getProductsStatus]);

  return content;
}

Layout.propTypes = {
  route: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
};
