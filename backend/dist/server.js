"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors = require("cors");
const app = (0, express_1.default)();
const port = 5000;
app.use(cors());
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        throw new Error("Error fetching data");
    }
});
app.get("/countries/available-countries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://date.nager.at/api/v3/AvailableCountries";
    try {
        const countries = yield fetchData(url);
        res.json(countries);
    }
    catch (error) {
        res.status(500).json({ error: "Unable to fetch countries" });
    }
}));
app.get("/countries/country-info/:countryCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { countryCode } = req.params;
    const countryInfoUrl = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;
    const populationUrl = `https://countriesnow.space/api/v0.1/countries/population`;
    const flagUrl = `https://countriesnow.space/api/v0.1/countries/flag/images`;
    try {
        const countryInfo = yield fetchData(countryInfoUrl);
        const populationData = yield fetchData(populationUrl);
        const flagData = yield fetchData(flagUrl);
        const countryPopulation = populationData.data.find((item) => item.country === countryCode);
        res.json({
            countryInfo,
            population: countryPopulation ? countryPopulation.population : null,
            flagUrl: (_a = flagData.data.find((item) => item.country === countryCode)) === null || _a === void 0 ? void 0 : _a.imageUrl,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Unable to fetch country information" });
    }
}));
app.use((req, res) => {
    res.status(404).json({ error: "Resource not found" });
});
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
