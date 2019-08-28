import React from 'react'

const System = (props) => {
    console.log('props', props)
    return (
        <div className='date-label'>
            <div className='label-style'>
                {props.text}
            </div>
        </div>
    )
}

export default System
