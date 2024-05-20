import React from "react";

let email=localStorage.getItem('userEmail')
console.log(email);

function Smallsongcard(props) {
    return (
        <div className='col-md-3 p-1'>
            <div className='p-3 songcardsmall shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div value={props.imagepath}>  
                    <h3 className='fs-5'>{props.name}</h3>
                    <p className='fs-6'>{props.duration}</p>
                </div>
                <i value={props.path} className='bi bi-play-circle p-3 fs-1'></i>
            </div>
        </div>
    );
}

export default Smallsongcard;
