import { Routes, Route } from "react-router-dom";

import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Layout from "./pages/Layout";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Container from "@mui/material/Container";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

const primaryColor = "rgba(196, 136, 33, 0.9)";
const primaryColorLight = "rgba(196, 136, 33, 0.1)";
const theme = createTheme({
  themeColor: primaryColor,
  containerStyle: {
    display: "flex",
    height: "100vh",
    width: { xs: "100vw", sm: "100%", md: "800px" },
  },
  homeContentStyle: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContentStyle: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: { xs: "0px", sm: "50px" },
    transform: { sm: "translateX(-6%)" },
  },
  leftSideContentStyle: { minWidth: "150px" },
  rightSideContentStyle: { width: { xs: "100vw", sm: "100%", md: "650px" } },
  appBarStyle: { width: "100%", backgroundColor: primaryColor },
  navBarLinkStyle: { textDecoration: "none", color: primaryColor },
  fullPageImageStyle: {
    maxHeight: "100vh",
    margin: "auto",
  },
  tableGridStyle: {
    display: "grid",
    gridTemplateColumns: {
      xs: "50px auto 75px 75px 75px",
      sm: "50px auto 100px 100px 75px",
    },
  },
  homeIconsStyle: {
    textDecoration: "none",
    color: primaryColor,
    textAlign: "center",
    margin: 20,
    transform: "translateY(10px)",
  },
  homeIconStyle: { transform: "scale(2) translateY(-10px)" },
  submitButtonStyle: { width: "75.2px", color: primaryColor },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "0px",
          paddingRight: "0px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient( to left, transparent, transparent 50%, ${primaryColor} 50%, ${primaryColor} )`,
          backgroundPosition: "-100% 0",
          backgroundSize: "200% 100%",
          transition: "all 0.25s ease-in",
          "&.Mui-selected": {
            backgroundColor: primaryColor,
            backgroundPosition: "0 0",
            color: "#fff",
          },
          "&.Mui-selected:hover": {
            backgroundColor: primaryColor,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-textPrimary:hover": {
            backgroundColor: primaryColorLight,
          },
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: primaryColor,
          "&.Mui-selected": {
            color: "#fff",
            backgroundColor: primaryColor,
          },
        },
      },
    },
  },
});

const pages = [
  {
    index: 0,
    path: "/checkout",
    text: "Checkout",
    icon: function (style) {
      return <PaidOutlinedIcon sx={style} />;
    },
    duration: 1000,
  },
  {
    index: 1,
    path: "/inventory",
    text: "Inventory",
    icon: function (style) {
      return <CategoryOutlinedIcon sx={style} />;
    },
    duration: 1500,
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={theme.containerStyle}>
        <Routes>
          <Route
            path="/"
            element={<Layout route={{ location }} pages={pages} />}
          >
            <Route path="checkout" element={<Checkout />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
          <Route path="*" element={<Home pages={pages} />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
