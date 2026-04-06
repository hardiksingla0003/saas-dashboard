import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRef, useEffect, useState } from "react";
const defaultData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 8000 },
  { month: "Apr", revenue: 4000 },
  { month: "May", revenue: 2500 },
  { month: "Jun", revenue: 5500 },
];
const RevenueChart = ({ data = defaultData }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow h-96"
    >
      <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>

      {width > 0 && (
        <LineChart width={width - 48} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      )}
    </div>
  );
};

export default RevenueChart;
