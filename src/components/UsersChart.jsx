import { BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { usersByRole } from "../data/dummyData";
import { useRef, useEffect, useState } from "react";

const UsersChart = () => {
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 w-full h-96"
    >
      <h2 className="text-lg font-semibold mb-4">Users By Role</h2>
      {width > 0 && (
        <BarChart width={width - 40} height={300} data={usersByRole}>
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      )}
    </div>
  );
};

export default UsersChart;
