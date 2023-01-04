import { useState } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";

export default function Home({ pages }) {
  console.log("rendering home");
  const [fadeIn, setFadIn] = useState(true);
  const [cutNum, setCutNum] = useState(1);
  const theme = useTheme();

  const handleTransitionEnd = () => {
    setTimeout(() => {
      setFadIn(false);
      setTimeout(() => {
        setCutNum(2);
      }, 1500);
    }, 1500);
  };

  let content;

  if (cutNum === 1) {
    content = (
      <Fade
        in={fadeIn}
        timeout={1500}
        easing="ease-in"
        addEndListener={handleTransitionEnd}
      >
        <img
          src="https://drive.google.com/uc?export=view&id=1_EXAN26w3Zwd16WyEheUyiDSzccsBKpn"
          style={{ maxHeight: "50%", maxWidth: "50%" }}
        />
      </Fade>
    );
  } else {
    content = pages.map((page) => {
      return (
        <Grow in={true} timeout={page.duration} key={page.index}>
          <Link to={page.path} style={theme.homeIconsStyle}>
            {page.icon(theme.homeIconStyle)}
            <Typography variant="h4" component="div">
              {page.text}
            </Typography>
          </Link>
        </Grow>
      );
    });
  }

  return <Box sx={theme.homeContentStyle}>{content}</Box>;
}

Home.propTypes = {
  pages: PropTypes.array.isRequired,
};
