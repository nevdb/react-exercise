import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // Fetch available places from backed API
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        // const response = await fetch("http://localhost:3000/places");
        // const resData = await response.json();

        // if (!response.ok) {
        //   throw new Error(resData.message || "Failed to fetch places.");
        // }

        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const sortedPlaces = sortPlacesByDistance(
              places,
              position.coords.latitude,
              position.coords.longitude,
            );
            setAvailablePlaces(sortedPlaces);
            setIsFetching(false);
          },
          () => {
            // Geolocation denied or unavailable — show unsorted places
            setAvailablePlaces(places);
            setIsFetching(false);
          },
        );
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later!",
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  //   useEffect(() => {
  //     fetch("http://localhost:3000/user-places")
  //       .then((res) => res.json())
  //       .then(console.log);
  //   }, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
