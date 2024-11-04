import React from 'react'

const Heading = ({children}) => {
  return (
    <>
        <h1 className="flex text-3xl font-bold text-center">{children}</h1>
    </>
  )
}

export default Heading