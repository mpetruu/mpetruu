import React, { useEffect } from 'react'
import './Chatbot.css'

const Chatbot = () => {
  useEffect(() => {
    // First script
    const script1 = document.createElement('script')
    script1.src = process.env.REACT_APP_BOTPRESS_SCRIPT_URL2 || ''
    script1.async = true
    document.body.appendChild(script1)

    // Second script
    const script2 = document.createElement('script')
    script2.src = process.env.REACT_APP_BOTPRESS_SCRIPT_URL || ''
    script2.async = true
    //script2.defer = true
    document.body.appendChild(script2)
  }, [])

  return (
    <div className="chatbot-container">
      <div className="chatbot-status">
        <span className="status-text">Need financial help? 👋</span>
        <span className="status-indicator"></span>
      </div>
      <div id="webchat" />
    </div>
  )
}

export default Chatbot