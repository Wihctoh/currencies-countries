import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Typography } from "@mui/material";

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [dataCur, setDataCur] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  async function request() {
    const response = await axios.get("https://www.nbrb.by/API/ExRates/Currencies");
    setData(response.data);
  }

  async function requestCurrValue() {
    try {
      const response = await axios.get(`https://api.nbrb.by/exrates/rates/${value}?parammode=2`);
      setDataCur(response.data);
    } catch (error) {
      alert("Курс данной валюты недоступен, попробуйте позже!");
    }
  }

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    requestCurrValue();
  }, [value]);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <FormControl style={{ width: 400 }}>
        <InputLabel id="test">Select Currency</InputLabel>
        <Select
          labelId="Currency"
          id="Currency"
          value={value}
          label="Select Currency"
          onChange={handleChange}
        >
          {data.map((el, index) => (
            <MenuItem key={index} value={el.Cur_Abbreviation}>
              {el.Cur_Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h5">Текущий курс: {dataCur.Cur_OfficialRate} </Typography>
    </div>
  );
}

export default App;
