import express, { Request, Response } from "express";

import axios from "axios";

const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());

const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

app.get(
  "/countries/available-countries",
  async (req: Request, res: Response) => {
    const url = "https://date.nager.at/api/v3/AvailableCountries";
    try {
      const countries = await fetchData(url);
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch countries" });
    }
  }
);

app.get(
  "/countries/country-info/:countryCode",
  async (req: Request, res: Response) => {
    const { countryCode } = req.params;

    const countryInfoUrl = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;
    const populationUrl = `https://countriesnow.space/api/v0.1/countries/population`;
    const flagUrl = `https://countriesnow.space/api/v0.1/countries/flag/images`;

    try {
      const countryInfo = await fetchData(countryInfoUrl);
      const populationData = await fetchData(populationUrl);
      const flagData = await fetchData(flagUrl);

      const countryPopulation = populationData.data.find(
        (item: { country: string }) => item.country === countryCode
      );

      res.json({
        countryInfo,
        population: countryPopulation ? countryPopulation.population : null,
        flagUrl: flagData.data.find(
          (item: { country: string }) => item.country === countryCode
        )?.imageUrl,
      });
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch country information" });
    }
  }
);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Resource not found" });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
