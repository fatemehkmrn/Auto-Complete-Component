import React from "react";

// Components
import AutoComplete from "./components/AutoComplete";

const colors = [
  "blue",
  "green",
  "pink",
  "plum",
  "aqua",
  "biege",
  "purple",
  "white",
  "gray",
  "black",
  "red",
  "yellow",
  "orange",
  "brown",
  "lime",
  "silver"
];
const App: React.FC = () => {
  return (
    <React.Fragment>
      <AutoComplete options={colors} />
    </React.Fragment>
  );
};

export default App;
