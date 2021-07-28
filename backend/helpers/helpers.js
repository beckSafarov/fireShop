import asyncHandler from 'express-async-handler'

export const checkForValues = (values = [], res, statusCode) => {
  values.forEach((value) => {
    if (value === undefined) {
      res.status(statusCode)
      throw new Error(`Insufficient details`)
    }
  })
}

export const isAvailable = asyncHandler(async (Product, _id, qty) => {
  const product = await Product.findById(_id)
  let error = null
  if (!product) {
    error = `No order was found with the id of ${_id}`
  } else if (product.countInStock < qty) {
    error = `Not enough products in stock. In stock: ${product.countInStock}, you require: ${qty}`
  }

  return { error, product }
})

// receives: [{_id: x, qty: y ...]
export const joinDuplicateObjects = (arr) => {
  let a = arr.slice().sort()
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i + 1]._id === a[i]._id) {
      a[i + 1].qty += a[i].qty
      a.splice(i, 1)
    }
  }

  return a
}

export const formatDate = (date) => {
  if (!date) return 'undefined'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  return `${year} - ${month} - ${day}, ${hour}:${minutes}`
}

export const addDateFormats = (order) => {
  const UTCDate = order.deliveredAt.toUTCString()
  const ISODate = `${order.deliveredAt.getFullYear()}-${order.deliveredAt.getMonth()}-${order.deliveredAt.getDate()}`
  return { ...order._doc, UTCDate, ISODate }
}
