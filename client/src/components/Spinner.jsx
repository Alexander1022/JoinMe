import React from "react";
import { ThreeDots } from 'react-loader-spinner';

function Spinner({ message }) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">            
            <ThreeDots 
                color='black' 
                height={80} 
                width={80}
                className="m-5" 
                ariaLabel='loading'
            />

            <p className="text-lg text-center px-2">{message}</p>
        </div>
    )
}


export default Spinner;
