import React, { useState } from "react";

let email=localStorage.getItem('userEmail')
console.log(email);

function Colaborationrequestcard(props) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your form submission logic here
        console.log(`Form submitted with value: ${inputValue}`);

    };
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.owner}</td>
            <td>{props.genre}</td>
            <td>{props.role}</td>
            <td>{props.description}</td>
            <td><input
                type="text"
                className="form-control"
                placeholder="Enter your text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            /></td>
            <td><button value={props.crid} onClick={handleSubmit} type="button" class="btn btn-primary">Apply</button></td>
        </tr>
    );
}

export default Colaborationrequestcard;