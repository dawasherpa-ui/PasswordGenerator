import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Slider,
  Switch,
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";

function Main() {
  const [value, setValue] = useState("");
  const [length, setLength] = useState(13);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(false);
  const [uCase, setUCase] = useState(true);
  const [lCase, setLCase] = useState(true);
  const [sCharacter, setSCharacter] = useState(false);
  const [strict, setStrict] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleFetch = async () => {
    try {
      const response = await fetch('https://backendpasswordgen-production.up.railway.app/',{
        method:'POST',
        headers:{
          'content-type':'application/json'
          },
          body:JSON.stringify({
            length : length,
            number : number,
            symbol : symbol,
            uppercase : uCase,
            lowercase : lCase,
            exsimlar : sCharacter,
            strict : strict
            })
      });
      const data = await response.json();
      // Process the fetched data here
      setValue(data[0].password)
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error(error);
    }
  };
  const handleGenerate=()=>{
    if((number||symbol||uCase||lCase)===false){
      alert('Please select at least one uppercase and lowercase letter.')
    }
    else{
      handleFetch();
    }
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "auto", sm: "84vh" },
        paddingBlock: "40px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box sx={{ minWidth: "200px", maxWidth: "80%" }}>
        <Box
          sx={{
            paddingBottom: "38px",
            display: "grid",
            placeItems: "center",
            gap: "10px",
          }}
        >
          <TextField
            id="input-with-icon-textfield"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(value);
                      handleClick()
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button variant="contained" onClick={handleGenerate}>Generate</Button>
        </Box>
        <Slider
          value={length}
          color="secondary"
          max={20}
          onChange={(e)=>{setLength(e.target.value)}}
          min={8}
          valueLabelDisplay="on"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            p: 2,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={number}
                onChange={(e) => {
                  setNumber(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Numbers"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Switch
                checked={symbol}
                onChange={(e) => {
                  setSymbol(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Symbols"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Switch
                checked={lCase}
                onChange={(e) => {
                  setLCase(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="LowerCase"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Switch
                checked={uCase}
                onChange={(e) => {
                  setUCase(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="UpperCase"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Switch
                checked={sCharacter}
                onChange={(e) => {
                  setSCharacter(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Similar Characters"
            labelPlacement="top"
          />
          <FormControlLabel
            control={
              <Switch
                checked={strict}
                onChange={(e) => {
                  setStrict(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Strict"
            labelPlacement="top"
          />
        </Box>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Text Copied"
        action={action}
      />
      </Box>
    </Box>
  );
}

export default Main;
