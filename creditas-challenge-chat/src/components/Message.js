import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, author }) => (  
  <div className={author === 'Me' ? 'message-box-right' : 'message-box-left'}>
    {author === 'Me' ? <p className="author-text-right">I said:</p> : <p className="author-text-left">{author} says:</p>}
   
    <div className="message-box">
      <p>
        {message}
      </p>
    </div>
  </div>


)

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default Message
