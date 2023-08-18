import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Button, Typography } from "@mui/material";

function App() {
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  async function request() {
    const response = await axios.get("https://www.nbrb.by/API/ExRates/Currencies");
    setData(response.data);
  }

  async function request1() {
    try {
      const response = await axios.get(`https://api.nbrb.by/exrates/rates/${age}?parammode=2`);
      setData1(response.data);
    } catch (error) {
      alert("Course unavailable, please select another currencies!");
    }
  }

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <FormControl style={{ width: 400 }}>
        <InputLabel id="test">Select Occupation</InputLabel>
        <Select
          labelId="test"
          id="test"
          value={age}
          label="Select Occupation"
          onChange={handleChange}
        >
          {data.map((el, index) => (
            <MenuItem key={index} value={el.Cur_Abbreviation}>
              {el.Cur_Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h5">Текущий курс: {data1.Cur_OfficialRate} </Typography>
      <Button onClick={request1} variant="contained" style={{ width: 150 }}>
        get course
      </Button>
    </div>
  );
}

export default App;
