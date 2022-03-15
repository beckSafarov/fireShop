import React from 'react'

const UserAddress = ({ data }) => {
  return data ? (
    <>
      {data.address}, {data.city}, {data.postalCode}, {data.country}
    </>
  ) : (
    <p></p>
  )
}

export default UserAddress
