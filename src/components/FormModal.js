import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";

import SubmitButton from "./SubmitButton";
import { selectProducts } from "../redux/products/productSlice";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";

export default function FormModal(props) {
  console.log("render FormModal");
  const { type, data } = props;
  const dispatch = useDispatch();
  const initialValues = {
    id: type === "create" ? "" : data.id,
    name: type === "create" ? "" : data.name,
    price: type === "create" ? "" : data.price,
    quantity: type === "create" ? "" : data.quantity,
  };
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [isValuesChanged, setIsValuesChanged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { submitFormStatus } = useSelector(selectProducts);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const addButtonStyle = isMobileView
    ? {
        position: "fixed",
        bottom: "70px",
        right: "18px",
        backgroundColor: theme.themeColor,
        color: "#fff",
      }
    : { backgroundColor: "#fff", color: theme.themeColor };

  const handleRest = () => {
    setOpen(false);
    setIsValuesChanged(false);
    setValues(initialValues);
  };

  const handleClickOpen = () => {
    if (!isDragging) setOpen(true);
    setIsDragging(false);
  };

  const handleClose = () => handleRest();

  const handleChange = (prop) => (event) => {
    setValues((prevVales) => {
      console.log("initialValues", initialValues);
      console.log("prevVales", prevVales);
      const targetValue = event.target.value;
      const currentValue = {
        ...prevVales,
        [prop]:
          prop === "name"
            ? targetValue
            : targetValue === ""
            ? ""
            : parseInt(targetValue),
      };
      // Check if any value changed
      console.log("currentValue", currentValue);
      if (JSON.stringify(currentValue) === JSON.stringify(initialValues))
        setIsValuesChanged(false);
      else setIsValuesChanged(true);
      return currentValue;
    });
  };

  const handleSubmit = (method) => dispatch(method(values));

  const handleDrag = () => setIsDragging(true);

  useEffect(() => {
    if (submitFormStatus === "ready") handleRest();
  }, [submitFormStatus]);

  return (
    <>
      {type === "create" ? (
        isMobileView ? (
          <Draggable onDrag={handleDrag}>
            <Fab
              size="medium"
              aria-label="add"
              onClick={handleClickOpen}
              sx={addButtonStyle}
            >
              <AddIcon />
            </Fab>
          </Draggable>
        ) : (
          <Fab
            size="medium"
            aria-label="add"
            onClick={handleClickOpen}
            sx={addButtonStyle}
          >
            <AddIcon />
          </Fab>
        )
      ) : (
        <Fab
          size="small"
          aria-label="edit"
          onClick={handleClickOpen}
          sx={{ backgroundColor: "#fff", color: theme.themeColor }}
        >
          <EditIcon />
        </Fab>
      )}
      <Dialog open={open} onClose={handleClose} sx={{ width: "100vw" }}>
        <DialogTitle>
          {type === "create" ? "New Product" : data.name}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="ID"
            value={values.id}
            onChange={handleChange("id")}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
          />
          <TextField
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="text"
          />
          <FormControl margin="normal">
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput
              id="price"
              value={values.price}
              onChange={handleChange("price")}
              startAdornment={
                <InputAdornment position="start">$NT</InputAdornment>
              }
              label="Price"
              type="number"
            />
          </FormControl>
          <TextField
            id="quantity"
            value={values.quantity}
            onChange={handleChange("quantity")}
            label="Quantity"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            type="number"
          />
        </DialogContent>
        <DialogActions disableSpacing={true}>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <SubmitButton
            submitFormStatus={submitFormStatus}
            type={type}
            handleSubmit={handleSubmit}
            isValuesChanged={isValuesChanged}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

FormModal.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object,
};
