"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PopulationCountsType } from "@/app/services/CountriesService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  countryName: string;
  populationCounts: PopulationCountsType[];
};

const Chart = ({ countryName, populationCounts }: ChartProps) => {
  const labels = populationCounts.map((item) => item.year.toString());
  const data = populationCounts.map((item) => item.value);

  const charData = {
    labels,
    datasets: [
      {
        label: `${countryName} population`,
        data,
        borderColor: "rgba(96, 165, 250, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.raw.toLocaleString()} people`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population",
        },
        beginAtZero: false,
      },
    },
  };

  return <Line data={charData} options={options} />;
};

export default Chart;
