import axios, { AxiosError } from "axios";

export type CountryBasicInfoType = {
  countryCode: string;
  name: string;
};

export type PopulationCountsType = {
  year: number;
  value: number;
};

type CountryInfo = {
  countryInfo: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: BordersType[];
  };
  population: PopulationCountsType[] | null;
  flagUrl: string | undefined;
};

type BordersType = {
  commonName: string;
  countryCode: string;
  officialName: string;
  region: string;
};

const handleError = (error: AxiosError, defaultMessage: string) => {
  if (error instanceof AxiosError && error.response?.status === 404) {
    return `Not found: ${defaultMessage}`;
  }
  return defaultMessage;
};

const CountriesService = {
  baseUrl: process.env.API_URL,
  getAvailableCountries: async (): Promise<CountryBasicInfoType[]> => {
    try {
      const response = await axios.get(
        `${CountriesService.baseUrl}/countries/available-countries`
      );

      return response.data;
    } catch (error) {
      const message = handleError(
        error as AxiosError,
        "Unable to fetch available countries"
      );

      throw new Error(message);
    }
  },

  getCountryInfo: async (countryCode: string): Promise<CountryInfo> => {
    try {
      const countryInfoUrl = `${CountriesService.baseUrl}/countries/country-info/${countryCode}`;
      const response = await axios.get(countryInfoUrl);

      return response.data;
    } catch (error) {
      const message = handleError(
        error as AxiosError,
        `Unable to fetch country info for ${countryCode}`
      );

      throw new Error(message);
    }
  },
};

export default CountriesService;
