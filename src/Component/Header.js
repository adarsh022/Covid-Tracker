import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import Header_Card from './Header_Card';
import Graph from './Graph';

export default function Header() {
  const [Data, setData] = useState('');
  const [Country, setCountry] = useState();
  const [ShowCountry, setShowCountry] = useState();
  const [Label, setLabel] = useState('Global');

  useEffect(() => {
    const apiCall = async () => {
      if (ShowCountry) {
        const [first, second] = await Promise.all([
          axios.get(`https://covid19.mathdro.id/api/countries/${ShowCountry}`),
          axios.get('https://covid19.mathdro.id/api/countries'),
        ]);
        setData(first.data);
        setCountry(second.data.countries);
      } else {
        const [first, second] = await Promise.all([
          axios.get('https://covid19.mathdro.id/api'),
          axios.get('https://covid19.mathdro.id/api/countries'),
        ]);
        setData(first.data);
        setCountry(second.data.countries);
      }
    };
    apiCall();
  }, [ShowCountry]);

  let arr1 = Data
    ? [
        { value: Data.confirmed.value, text: 'Infected :' },
        { value: Data.recovered.value, text: 'Recovered :' },
        { value: Data.deaths.value, text: 'Death :' },
      ]
    : [];

  let arr2 = Country ? Country : [];

  const changeHandler = (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;
    setLabel(label);
    setShowCountry(e.target.value);
  };

  return (
    <>
      <header className='Header_Main'>
        <h1>COVID TRACKER - {Label} </h1>
        <div className='Header_Cards'>
          {arr1 ? (
            arr1.map((item, index) => (
              <Header_Card value={item.value} p={item.text} key={index} />
            ))
          ) : (
            <h1>No Data</h1>
          )}
        </div>
        <div className='Selector'>
          <select name='' id='' onChange={(e) => changeHandler(e)}>
            <option value={''}>Global</option>
            {arr2.map((item, index) => {
              return (
                <option key={index} value={item.iso3}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      {ShowCountry ? (
        <Graph country={Label} prop={ShowCountry} />
      ) : (
        <Graph country={Label} prop={arr1} />
      )}
    </>
  );
}
