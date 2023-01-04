import { useState } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import PropTypes from "prop-types";

export default function Navbar(props) {
  console.log("rendering navbar");
  const { selected, pages } = props;
  const [selectedIndex, setSelectedIndex] = useState(selected);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return isMobileView ? (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9 }}
      elevation={3}
    >
      <BottomNavigation
        value={selectedIndex}
        onChange={(event, newValue) => {
          setSelectedIndex(newValue);
        }}
      >
        {pages.map((page) => {
          return (
            <BottomNavigationAction
              label={selectedIndex === page.index ? page.text : ""}
              icon={page.icon()}
              component={Link}
              to={page.path}
              key={page.index}
              sx={{ borderRadius: "30px", flexDirection: "row", gap: "10px" }}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  ) : (
    <Box sx={theme.leftSideContentStyle}>
      <List component="nav" aria-label="navbar" sx={{ padding: "0px" }}>
        {pages.map((page) => {
          return (
            <Link to={page.path} style={theme.navBarLinkStyle} key={page.index}>
              <ListItemButton
                selected={selectedIndex === page.index}
                onClick={(event) => handleListItemClick(event, page.index)}
                sx={{textAlign: "center"}}
              >
                {page.icon()}
                <ListItemText primary={page.text} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Box>
  );
}

Navbar.propTypes = {
  selected: PropTypes.number.isRequired,
  pages: PropTypes.array.isRequired,
};
