import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Checkout() {
  console.log("render checkout");
  const theme = useTheme();

  return (
    <AppBar position="static" sx={theme.appBarStyle}>
      <Toolbar>
        <Typography variant="h4" component="div">
          Checkout
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
