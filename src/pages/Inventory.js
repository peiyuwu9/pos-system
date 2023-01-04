import { useSelector } from "react-redux";

import FormModal from "../components/FormModal";
import EnhancedTable from "../components/EnhancedTable";
import { selectProductList } from "../redux/products/productSlice";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Inventory() {
  console.log("render Inventory");
  const data = useSelector(selectProductList);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  // Fake data for testing
  // const data = [
  //   { id: 1, name: "杯托1", price: 12, quantity: 200 },
  //   { id: 2, name: "杯托2杯托2", price: 120, quantity: 300 },
  //   { id: 3, name: "杯托3", price: 13, quantity: 2000 },
  //   { id: 4, name: "杯托4", price: 40, quantity: 500 },
  //   { id: 5, name: "杯托5", price: 72, quantity: 900 },
  //   { id: 6, name: "杯托6", price: 110, quantity: 100 },
  //   { id: 7, name: "杯托7", price: 128, quantity: 200 },
  // ];

  return (
    <>
      <AppBar position="static" sx={theme.appBarStyle}>
        <Toolbar>
          <Typography
            edge="start"
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Inventory
          </Typography>
          {!isMobileView && <FormModal type={"create"} />}
        </Toolbar>
      </AppBar>
      <EnhancedTable data={data} />
      {isMobileView && <FormModal type={"create"} />}
    </>
  );
}
