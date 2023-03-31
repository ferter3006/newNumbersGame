import React from 'react'

function ClasicButton({ title, cost, win, icon, color, handleclick }) {
    return (

        <div className="col-sm-6 p-5">
            <div className="card" style={{ backgroundColor: color }}>
                <div onClick={() => handleclick(title)} className="card-body btn" style={{ paddingBottom: win ? '' : '25px' }}>
                    <h5 className="card-title">{title} {typeof title === 'number' ? `x ${title}` : ''}</h5>
                    <img src={icon} width='80px' style={{ marginBottom: '5px' }} />
                    {cost && <h6>Cuesta: {cost} points</h6>}
                    {win && <h6>Ganas: {win} points</h6>}
                </div>
            </div>
        </div>
    )
}

export default ClasicButton