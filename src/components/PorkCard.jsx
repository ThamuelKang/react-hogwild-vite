import React, { useState } from "react";
import { Card, Header, Button, Image } from "semantic-ui-react";

function PorkCard({ porkName, imgSource, weight, specialty, greased, medal, onHide }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <Card aria-label="hog card" className="ui card" onClick={toggleDetails}>
      <Image src={imgSource} alt={`Photo of ${porkName}`} wrapped ui={false} />
      <Card.Content>
        <Header as="h3">{porkName}</Header>
        {showDetails && (
          <div className="content">
            <p>Specialty: {specialty}</p>
            <p>{weight}</p>
            <p>{greased ? "Greased" : "Nongreased"}</p>
            <p>{medal}</p>
          </div>
        )}
        <Button onClick={(e) => {
          e.stopPropagation();
          onHide(porkName);
        }}>
          Hide Me
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PorkCard;
