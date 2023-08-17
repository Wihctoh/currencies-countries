import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

function App() {
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  async function request() {
    const response = await axios.get("https://www.nbrb.by/API/ExRates/Currencies");
    setData(response.data);
  }

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="App">
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
            <MenuItem key={index} value={index}>
              {el.Cur_Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
