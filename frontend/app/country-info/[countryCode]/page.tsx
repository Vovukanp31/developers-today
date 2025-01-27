import Chart from "@/app/components/cards/Chart";
import CountryCard from "@/app/components/cards/CountryCard";
import CountriesService from "@/app/services/CountriesService";
import Image from "next/image";

type PageProps = {
  params: {
    countryCode: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { countryCode } = await params;

  const {
    countryInfo: { officialName, commonName, borders },
    population,
    flagUrl,
  } = await CountriesService.getCountryInfo(countryCode);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start gap-8 px-5 py-4">
      <div className="flex w-full gap-2">
        <div className="flex min-h-full w-2/3 items-center justify-center rounded-md bg-gray-200 p-5 text-center">
          <h1 className="text-3xl font-semibold text-black md:text-5xl lg:text-7xl">
            {officialName}
          </h1>
        </div>

        <div className="flex min-h-full w-1/3 flex-col items-center justify-center gap-2 rounded-md bg-gray-200 p-5 text-center">
          <p className="text-xl md:text-3xl lg:text-5xl">{commonName}</p>
          {flagUrl && (
            <aside className="rounded-sm bg-gray-500 p-2">
              <Image
                src={flagUrl}
                alt={`${commonName} flag image`}
                width={50}
                height={50}
                className="max-h-[35px] max-w-[35px] lg:max-h-[50px] lg:max-w-[50px]"
              />
            </aside>
          )}
        </div>
      </div>

      {borders && !!borders.length && (
        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md bg-gray-50 p-5 text-center">
          <p className="text-xl">Border countries:</p>
          <br />
          <div className="flex flex-wrap gap-4">
            {borders.map(({ countryCode, commonName }, i) => (
              <CountryCard
                key={i}
                countryCode={countryCode}
                name={commonName}
              />
            ))}
          </div>
        </div>
      )}

      {population && (
        <Chart countryName={commonName} populationCounts={population} />
      )}
    </main>
  );
};

export default Page;
