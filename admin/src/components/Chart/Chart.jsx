import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { dataCharts } from "../../data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu Đồ Cột Doanh thu",
    },
  },
};


export const data = {
  labels: dataCharts.map((item) => item.thang),
  datasets: [
    {
      label: "Doanh thu",
      data: dataCharts.map((item) => item.doanhthu),
      backgroundColor: "#5a4dea",
    }
  ],
};

export const Chart = () => {
  return (
    <section className="chart">
      <header>Doanh thu</header>
      <div className="chart__wrapper">
        <Bar options={options} data={data} />
      </div>
    </section>
  )
}
