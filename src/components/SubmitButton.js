import { createProduct, updateProduct } from "../api/products";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import PropTypes from "prop-types";

export default function submitButton(prop) {
  console.log("render submitButton");
  const { submitFormStatus, type, handleSubmit, isValuesChanged } = prop;
  const theme = useTheme();

  return submitFormStatus === "loading" ? (
    <Button disabled sx={theme.submitButtonStyle}>
      <CircularProgress />
    </Button>
  ) : type === "create" ? (
    <Button
      disabled={!isValuesChanged}
      onClick={() => handleSubmit(createProduct)}
      sx={theme.submitButtonStyle}
    >
      CREATE
    </Button>
  ) : (
    <Button
      disabled={!isValuesChanged}
      onClick={() => handleSubmit(updateProduct)}
      sx={theme.submitButtonStyle}
    >
      UPDATE
    </Button>
  );
}

submitButton.propTypes = {
  submitFormStatus: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
