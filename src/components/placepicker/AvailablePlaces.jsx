import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../../loc.js";
import { fetchAvailablePlaces } from "../../http.js";
import { useFetch } from "../../hooks/useFetch.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  if (!navigator.geolocation) {
    return places;
  }

  return new Promise((resolve) => {
    let didResolve = false;

    const finish = (result) => {
      if (didResolve) {
        return;
      }

      didResolve = true;
      resolve(result);
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude,
        );

        finish(sortedPlaces);
      },
      () => {
        finish(places);
      },
      { timeout: 5000 },
    );

    // If geolocation stalls (e.g. user ignores browser prompt), render unsorted places.
    setTimeout(() => finish(places), 5500);
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

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
