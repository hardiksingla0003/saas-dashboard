const StatCard = ({ stat }) => {
  const isPositive = stat.change >= 0;
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl shadow-md dark:shadow-lg p-6 hover:shadow-lg transition-all duration-300  hover:-translate-y-1">
      <div className="text-sm text-gray-500 mb-2">{stat.title}</div>
      <div className="text-2xl font-bold mb-2">{stat.value}</div>
      <div
        className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"} `}
      >
        <span>{isPositive ? "▲" : "▼"}</span>
        {isPositive ? "+" : ""}
        {stat.change}% from last month
      </div>
    </div>
  );
};

export default StatCard;
