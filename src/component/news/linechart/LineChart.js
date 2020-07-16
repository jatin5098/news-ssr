import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const LinerChart = (props) => {
  const { newsList, voteDetails, hiddenList, width } = props;
  let mapData = [];
  for (const vote in voteDetails) {
    mapData.push(voteDetails[vote]);
  }
  const sortData = mapData.sort((a, b) => {
    const dateNew = new Date(a.created_at).getTime();
    const dateOld = new Date(b.created_at).getTime();
    return dateNew - dateOld;
  });
  const data = sortData.filter((data) => {
    if (hiddenList && hiddenList[data.objectID]) {
      return (
        hiddenList[data.objectID].isVisible &&
        newsList.find((list) => list.objectID === data.objectID)
      );
    }
    return newsList.find((list) => list.objectID === data.objectID);
  });

  return (
    <section id="chartContainer" className="chart-container w-100 py-3">
      <LineChart
        width={width}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="objectID" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="points"
          stroke="#8884d8"
          activeDot={{ r: 10 }}
        />
      </LineChart>
    </section>
  );
};

export default LinerChart;
