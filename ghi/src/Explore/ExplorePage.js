import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import "./Explore.css";
import ShowReview from "./ShowReviews";
import { CreateVenue } from "./CreateVenue";

export function Explore() {
  const [venues, setVenues] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const baseUrl = process.env.REACT_APP_TRAVELSQUARED;

  const stateUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    const VenuesUrl = `${baseUrl}/api/venues/${state}/${city}`;
    const responseVenues = await fetch(VenuesUrl);
    const venueData = await responseVenues.json();
    setVenues(venueData);
  };

  return (
    <>
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "250px",
            font: "sans-serif",
            fontSize: "55px",
          }}
        >
          Discover places out there.
        </h1>
      </div>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            font: "sans-serif",
            fontSize: "26px",
          }}
          onSubmit={handleSubmit}
          id="searchCity"
        >
          <div className="d-flex justify-content-center">
            <input
              className="search-box"
              name="city"
              defaultValue={city}
              required
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              type="text"
            />
            <input
              className="search-box"
              name="state"
              defaultValue={state}
              required
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              maxLength="2"
              type="text"
              onInput={stateUppercase}
            />
            <button
              style={{
                font: "sans-serif",
                fontSize: "26px",
                backgroundColor: "#D73851",
                padding: "0px 30px",
                color: "white",
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <CreateVenue />
      <div className="justify-content-center textbox-padding card-grid">
        {venues.map((venue) => {
          return (
            <Card style={{ margin: "1rem" }} key={venue.id} className="card">
              <Card.Body>
                <Card.Title className="d-flex justify-content-center">
                  {venue.venue_name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-center">
                  {venue.category_name}
                </Card.Subtitle>
                <Card.Text className="d-flex justify-content-center">
                  {venue.num_and_street}, {venue.city}, {venue.state},{" "}
                  {venue.zip}
                </Card.Text>
                <Card.Text className="d-flex justify-content-center">
                  {venue.description_text}
                </Card.Text>
                <Card.Text className="d-flex justify-content-center">
                  Submitted by: {venue.added_by_username}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <ShowReview venue={venue} />
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Explore;
