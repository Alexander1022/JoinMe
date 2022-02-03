import React from "react";
import { ThreeDots } from 'react-loader-spinner';

function Spinner({ message }) {
    return (
        <div className="flex p-0 h-screen justify-center items-center bg-zinc-900">
            <div className="h-screen flex justify-center items-center flex-col w-full">    
                <ThreeDots 
                    color='white' 
                    height={80} 
                    width={80}
                    className="m-5" 
                    ariaLabel='loading'
                />

                <p className="text-lg text-center px-2 text-white">{message}</p>
            </div>
        </div>
    )
}


export default Spinner;
