const Notification = ({ successMessage, errorMessage }) => {
  let className
  let message

  if (successMessage === null && errorMessage === null) {
    return null
  } else if (successMessage) {
    className = 'success'
    message = successMessage
  } else {
    className = 'error'
    message = errorMessage
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification