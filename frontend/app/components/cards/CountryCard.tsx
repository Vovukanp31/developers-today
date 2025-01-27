import { CountryType } from "@/app/services/CountriesService";
import Link from "next/link";

type CountryCardProps = CountryType;

const CountryCard = ({ name, countryCode }: CountryCardProps) => {
  return (
    <div className="group rounded-md border border-gray-300 bg-gray-200 p-3 text-center shadow-sm transition hover:scale-[1.03]">
      <Link
        className="text-lg hover:text-blue-400"
        href={`/country-info/${countryCode}`}
      >
        {name}
      </Link>
      <p className="font-semibold">{countryCode}</p>
    </div>
  );
};

export default CountryCard;
