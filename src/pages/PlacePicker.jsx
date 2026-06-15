import { useState, useRef, useCallback } from "react";
import Modal from "../components/Modal.jsx";
import DeleteConfirmation from "../components/placepicker/DeleteConfirmation.jsx";
import Places from "../components/placepicker/Places.jsx";
import logoImg from "../assets/logo.png";
import { fetchUserPlaces, updateUserPlaces } from "../http.js";
import Error from "../components/placepicker/Error.jsx";
import { useFetch } from "../hooks/useFetch.js";
import AvailablePlaces from "../components/placepicker/AvailablePlaces.jsx";

function PlacePicker() {
  const selectedPlace = useRef();

  // const [userPlaces, setUserPlaces] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState(null);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    isFetching,
    error,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
  } = useFetch(fetchUserPlaces, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places.",
      });
    }

    await updateUserPlaces([selectedPlace, ...userPlaces]);
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id,
        ),
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id),
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || "Failed to delete place.",
        });
      }

      await updateUserPlaces(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id),
      );

      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces],
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header className="mb-8 rounded-3xl border border-slate-300/15 bg-slate-900/70 p-6 md:p-8">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <img
            src={logoImg}
            alt="Stylized globe"
            className="h-16 w-auto rounded-xl bg-slate-950/60 p-2"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8dcff]">
              Experience Studio
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              PlacePicker
            </h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Create your personal collection of places you would like to visit
              or you have visited.
            </p>
          </div>
        </div>
      </header>
      <main className="space-y-8">
        {error && (
          <Error
            title="An error occurred!"
            message={error.message}
            onConfirm={handleError}
          />
        )}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Loading your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default PlacePicker;
