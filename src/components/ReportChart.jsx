import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ReportChart = ({ data }) => {
    const labels = data.map((entry) =>
        new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const registrations = data.map((entry) => entry.groupSize);
    const visitors = data.map((entry) => (entry.status !== "registeredOnly" ? entry.groupSize : 0));

    const chartData = {
        labels,
        datasets: [
            {
                label: "Registrations",
                data: registrations,
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                tension: 0.3,
            },
            {
                label: "Visitors",
                data: visitors,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                tension: 0.3,
            },
        ],
    };

    return <Line data={chartData} />;
};

export default ReportChart;
