import React from "react";
import "./Nav.css";

export default function HomePage() {
  return (
    <div className="cover">
      <h1>Discover what's out there.</h1>
      <form className="flex-form">
        <label htmlFor="from">
        </label>
        <input type="search" placeholder="City" />
        |
        <input type="search" placeholder="State" />
        <input type="submit" value="search" />
      </form>
    </div>
  );
}
