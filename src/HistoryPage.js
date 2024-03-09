import React, { useState, useEffect } from 'react';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [sortByTimestamp, setSortByTimestamp] = useState(false);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productHistory');
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error('Error fetching history data: ', error);
    }
  };

  const toggleSort = () => {
    setSortByTimestamp(!sortByTimestamp);
  };

  const sortedHistoryData = sortByTimestamp
    ? [...historyData].sort((a, b) => a.TimeStemp._seconds - b.TimeStemp._seconds)
    : historyData;

  return (
    <div>
      <h1>歷史紀錄</h1>
      <button onClick={toggleSort}>
        {sortByTimestamp ? '按時間排序' : '按時間反向排序'}
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>時間戳</th>
            <th>RX</th>
            <th>RY</th>
            <th>X</th>
            <th>RZ</th>
            <th>Y</th>
            <th>Z</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistoryData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{new Date(item.TimeStemp._seconds * 1000).toLocaleString()}</td>
              <td>{item.RX}</td>
              <td>{item.RY}</td>
              <td>{item.X}</td>
              <td>{item.RZ}</td>
              <td>{item.Y}</td>
              <td>{item.Z}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
