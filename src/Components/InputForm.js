import React from 'react'

function InputForm({ name, type = 'text', value, setValue, handlesubmit }) {

    const handleKeyDown = (e) => {        
        if (e.keyCode === 13) {        
            handlesubmit()
        }
    }
    return (
        <div style={{ margin: 3 }} className={'row'} >
            <div className='col-12 col-sm-4'>
                <span className='align-middle'>{name}</span>
            </div>
            <div className='col-12 col-sm-8'>
                <input className='form-control' type={type} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />

            </div>

        </div>
    )
}

export default InputForm