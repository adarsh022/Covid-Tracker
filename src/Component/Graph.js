import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';

export default function Graph({ prop, country }) {
  const [data, setData] = useState([]);

  console.log('this is graph', prop, country);

  useEffect(() => {
    if (country == 'Global') {
      const datils = {
        labels: prop.map((item) => item.text),
        datasets: [
          {
            label: 'First dataset',
            data: prop.map((item) => item.value),
            fill: true,
            backgroundColor: ['#ff6666', '#80ff80', '#b3b3b3'],
          },
        ],
      };
      console.log('datils fg', datils);
      setData(datils);
    } else {
      const apiCall = async () => {
        let first = await axios.get(
          `https://covid19.mathdro.id/api/countries/${prop}/confirmed`
        );

        const mergedData = first.data.map((item) => [
          item.confirmed,
          item.active,
          item.deaths,
          item.provinceState ? item.provinceState : item.combinedKey,
        ]);
        console.log(mergedData);

        const result = mergedData.map((item) => {
          return {
            label: item[3],
            data: item.slice(0, 3),
            fill: false,
            backgroundColor: ['#FFA500', '#b3b3b3', '#ff6666'],
            borderColor: '#E0E0E0',
          };
        });

        const datils = {
          labels: ['confirmed :', 'active :', 'deaths :'],
          datasets: result,
        };
        setData(datils);
        // console.log('datils', datils);
      };

      apiCall();
      // setData(datils);
    }

    // setData(datils);
  }, [prop]);

  console.log('data', data);

  return (
    <>
      <div className='graph-box'>
        <div className='Graph_Box'>
          <h3>Bar chart</h3>
          <Bar width={500} height={200} data={data} />
        </div>
        <div className='Graph_Box'>
          <h3>Line chart</h3>
          <Line width={500} height={200} data={data} />
        </div>
      </div>
    </>
  );
}
