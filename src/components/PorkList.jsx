import React from "react";
import PorkCard from "./PorkCard";

function PorkList({ hogs, onHide }) {
  return (
    <div className="ui cards">
      {hogs.map((hog) => (
        <PorkCard
          key={hog.name}
          porkName={hog.name}
          imgSource={hog.image}
          weight={hog.weight}
          specialty={hog.specialty}
          greased={hog.greased}
          medal={hog["highest medal achieved"]}
          onHide={onHide}
        />
      ))}
    </div>
  );
}

export default PorkList;
