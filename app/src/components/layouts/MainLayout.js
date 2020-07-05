import React, {Fragment} from 'react'

export default ({ header, sidebar, main }) =>
  <Fragment>
    <div>
      {header}
    </div>
    <div style={{ display: 'flex', direction: 'row', marginTop: '1em' }}>
      <div style={{ width: '15%' }}>
        {sidebar}
      </div>
      <div style={{ width: '80%', paddingLeft: '2.5%' }}>
        {main}
      </div>
    </div>
  </Fragment>
