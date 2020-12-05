import React from 'react'

export default function ErrorAlert(props) {
  return (
    <div className="alert alert-danger">
      <span>{props.children}</span>
    </div>
  )
}
