export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,
  loadingText,
}) {
  return (
    <section className="rounded-3xl border border-slate-300/15 bg-slate-900/60 p-5 md:p-6">
      <h2 className="text-center text-2xl font-bold text-white">{title}</h2>
      {isLoading && (
        <p className="mt-4 text-center text-sm text-slate-300">{loadingText}</p>
      )}
      {!isLoading && places.length === 0 && (
        <p className="mt-4 text-center text-sm text-slate-300">
          {fallbackText}
        </p>
      )}
      {!isLoading && places.length > 0 && (
        <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((place) => (
            <li
              key={place.id}
              className="group overflow-hidden rounded-2xl border border-slate-300/15 bg-slate-950/70 shadow-lg"
            >
              <button
                onClick={() => onSelectPlace(place)}
                className="block w-full text-left transition hover:scale-[1.01]"
              >
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-slate-100">
                    {place.title}
                  </h3>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
