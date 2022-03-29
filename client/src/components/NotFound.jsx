import React from "react";
import GIF_404 from "../assets/404.gif";

function NotFound()
{
    return (
        <div className="flex flex-col h-screen items-center justify-center bg-zinc-900">
            <h1 className="text-5xl text-white">
                Yeah, we didn't find that page.
            </h1>

            <img src={GIF_404} alt="404" className="mt-10 w-56 h-56"/>
        </div>
    );
}

export default NotFound;