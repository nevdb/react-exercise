import { useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  // Fetch available places from backed API

  //   useEffect(() => {
  //     fetch("http://localhost:3000/user-places")
  //       .then((res) => res.json())
  //       .then(console.log);
  //   }, []);

  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
