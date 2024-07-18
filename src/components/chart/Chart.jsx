import "./chart.scss";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ type, aspect }) => {
  let listData;

  switch (type) {
    case "order":
      listData = {
        title: "Last 6 Months (Order)",
        colorArea: "#7b3c08",
        id: "total2",
        fill: "url(#total2)",
        data: [
          { name: "January", Total: 125 },
          { name: "February", Total: 121 },
          { name: "March", Total: 85 },
          { name: "April", Total: 66 },
          { name: "May", Total: 97 },
          { name: "June", Total: 117 },
        ],
      };
      break;
    case "earning":
      listData = {
        title: "Last 6 Months (Earning)",
        colorArea: "#211002",
        id: "total1",
        fill: "url(#total1)",
        data: [
          { name: "January", Total: 1200 },
          { name: "February", Total: 2100 },
          { name: "March", Total: 800 },
          { name: "April", Total: 1600 },
          { name: "May", Total: 900 },
          { name: "June", Total: 1700 },
        ],
      };
      break;
    default:
      break;
  }

  return (
    <div className="chart">
      <div className="title">{listData.title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart width={730} height={250} data={listData.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={listData.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={listData.colorArea} stopOpacity={0.8} />
              <stop offset="95%" stopColor={listData.colorArea} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill={listData.fill} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;