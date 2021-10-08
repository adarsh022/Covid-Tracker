import React from 'react';
import CountUp from 'react-countup';

export default function Header_Card(props) {
  return (
    <div className='Header_Card'>
      <p>{props.p}</p>
      <CountUp start={0} end={props.value} duration={1} />
    </div>
  );
}
