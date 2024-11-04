import React, { useEffect } from 'react'
import AnalyticsMonthCount from '../myComponets/AnalyticsMonthCount'


const Analytics = ({ name }) => {
  useEffect(() => {
    console.log("name", name);
  }, [name]);


  return (
    <>
      <div className='grid grid-cols-2 gap-2 py-2 px-1 max-h-60'>
        <AnalyticsMonthCount />
        {/* <AnalyticsMonthCount /> */}
      </div>
    </>
  )
}

export default Analytics