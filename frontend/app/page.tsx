import CountryCard from "./components/cards/CountryCard";
import CountriesService from "./services/CountriesService";

export default async function Home() {
  const countries = await CountriesService.getAvailableCountries();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-8 py-4">
      {!!countries.length ? (
        <>
          <h1 className="text-3xl font-semibold text-blue-400 md:text-5xl lg:text-7xl">
            Countries list
          </h1>
          <article className="grid max-w-[1440px] grid-cols-5 grid-rows-1 gap-4">
            {countries.map(({ name, countryCode }, i) => (
              <CountryCard key={i} name={name} countryCode={countryCode} />
            ))}
          </article>
        </>
      ) : (
        <article>
          <h1 className="text-3xl text-blue-400 md:text-5xl lg:text-7xl">
            No Countries
          </h1>
        </article>
      )}
    </main>
  );
}
