import toStringFormValues from './toStringFormValues'

const send = (values) => {
  console.log(values)
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export default send
