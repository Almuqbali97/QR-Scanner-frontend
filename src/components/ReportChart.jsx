import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ReportChart = ({ data }) => {
    // Define time intervals (e.g., 4:30, 5:30, ..., 11:30)
    const startHour = 16; // 4:30 PM in 24-hour format
    const timeIntervals = Array.from({ length: 8 }, (_, i) => {
        const date = new Date();
        date.setHours(startHour + i, 30, 0, 0); // Set hour and 30 minutes
        return date;
    });

    // Group data by these intervals
    const groupedData = timeIntervals.map((interval, index) => {
        const nextInterval = new Date(interval);
        nextInterval.setHours(interval.getHours() + 1);

        const registrations = data.reduce((sum, entry) => {
            const entryTime = new Date(entry.timestamp);
            if (entryTime >= interval && entryTime < nextInterval) {
                return sum + entry.groupSize;
            }
            return sum;
        }, 0);

        const visitors = data.reduce((sum, entry) => {
            const entryTime = new Date(entry.timestamp);
            if (
                entry.status !== "registeredOnly" &&
                entryTime >= interval &&
                entryTime < nextInterval
            ) {
                return sum + entry.groupSize;
            }
            return sum;
        }, 0);

        return { interval, registrations, visitors };
    });

    // Prepare labels and datasets
    const labels = groupedData.map((entry) =>
        entry.interval.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    const registrations = groupedData.map((entry) => entry.registrations);
    const visitors = groupedData.map((entry) => entry.visitors);

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
