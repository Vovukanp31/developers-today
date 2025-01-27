import axios, { AxiosError } from "axios";

export type CountryType = {
  countryCode: "string";
  name: "string";
};

type CountryInfo = {
  countryInfo: any;
  population: string | null;
  flagUrl: string | undefined;
};

const handleError = (error: AxiosError, defaultMessage: string) => {
  if (error instanceof AxiosError && error.response?.status === 404) {
    return `Not found: ${defaultMessage}`;
  }
  return defaultMessage;
};

const CountriesService = {
  baseUrl: process.env.API_URL,
  getAvailableCountries: async (): Promise<CountryType[]> => {
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
