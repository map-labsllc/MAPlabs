import React from 'react'

const FormCard = ( {title, children}) => (
  <div className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{ title }</h4>
            </div>
            <div className="card-body">
              { children }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default FormCard


               