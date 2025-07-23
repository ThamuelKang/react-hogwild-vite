import React, { useState } from "react";
import PorkList from "./PorkList";
import hogs from "../porkers_data";

function App() {
  const [hogList, setHogList] = useState(hogs);
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [newHog, setNewHog] = useState({
    name: "",
    weight: "",
    specialty: "",
    greased: false,
    image: "https://i.natgeofe.com/k/6d301bfc-ff93-4f6f-9179-b1f66b19b9b3/pig-young-closeup_3x2.jpg",
    "highest medal achieved": "none",
  });


  //Set greased (default is false)
  const handleGreasedToggle = () => {
    setGreasedOnly(!greasedOnly);
  };

  //Changing sortBy value (default is none)
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  //Hide functionality (default is hog array, creates a new array via .filter)
  const handleHide = (nameToHide) => {
    setHogList((prev) => prev.filter((hog) => hog.name !== nameToHide));
  };

//new hog function, destructures previous hog array
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  //Custom form
  const handleAddHog = (e) => {
    e.preventDefault();
    setHogList([...hogList, newHog]);
    setNewHog({
      name: "",
      weight: "",
      specialty: "",
      greased: false,
      image: "https://via.placeholder.com/150",
      "highest medal achieved": "none",
    });
  };

  //Show me only greased
  const filteredHogs = greasedOnly
    ? hogList.filter((hog) => hog.greased)
    : hogList;

  const sortedHogs = [...filteredHogs].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "weight") return a.weight - b.weight;
    return 0;
  });

  return (
    <div className="ui container">
      <h1 className="ui header">Hog App</h1>

      <form onSubmit={handleAddHog} className="ui form">
        <div className="field">
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" value={newHog.name} onChange={handleFormChange} />
        </div>
        <div className="field">
          <label htmlFor="weight">Weight:</label>
          <input
            id="weight"
            name="weight"
            value={newHog.weight}
            onChange={handleFormChange}
            type="number"
          />
        </div>
        <div className="field">
          <label htmlFor="specialty">Specialty:</label>
          <input
            id="specialty"
            name="specialty"
            value={newHog.specialty}
            onChange={handleFormChange}
          />
        </div>
        <div className="field">
          <label htmlFor="greased">Greased?</label>
          <input
            id="greased"
            name="greased"
            type="checkbox"
            checked={newHog.greased}
            onChange={handleFormChange}
          />
        </div>
        <button className="ui primary button" type="submit">Add Hog</button>
      </form>

      <div className="ui form">
        <div className="inline field">
          <label htmlFor="greasedOnly">Greased Pigs Only?</label>
          <input
            id="greasedOnly"
            type="checkbox"
            checked={greasedOnly}
            onChange={handleGreasedToggle}
          />
        </div>
        <div className="field">
          <label htmlFor="sortBy">Sort by:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange}>
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </div>
      </div>

      <PorkList hogs={sortedHogs} onHide={handleHide} />
    </div>
  );
}

export default App;
