import React, { useState, useRef, useMemo, useCallback } from "react";
import MapPicker from 'react-google-map-picker';
import axios from 'axios'; 
import FileBase64 from 'react-file-base64';

const DefaultLocation = { lat: 42.6977, lng: 23.3219};
const DefaultZoom = 15;
  

function EventForm()
{
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [cover, setCover] = useState("");

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation(lat, lng)
    {
        setLocation({lat: lat, lng: lng});
        console.log(location);
    }

    function handleChangeZoom(newZoom)
    {
        setZoom(newZoom);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    
    const handleChangeDesc = (event) => {
        setDesc(event.target.value);
    };

    const handleChangeDate = (event) => {
        setDate(event.target.value);
    };

    const handleChangeTime = (event) => {
        setTime(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setTitle("");
        setDesc("");
        setTime("");
        setDate("");
        setCover("");
        setDefaultLocation(DefaultLocation);

        const newEvent = {
           title: title,
           description: desc,
           date: date,
           time: time,
           coverUrl: cover,
           place: [
               {
                   lat: location.lat,
                   lon: location.lng
               }
           ]
        };

        axios.post('http://localhost:5000/events/add', newEvent)
            .then(res => console.log(res.data));

        console.log(newEvent);

    };

    return (
        <div className="flex pb-0 h-screen justify-center items-center bg-zinc-900">
            <div className="h-screen flex justify-center items-center w-full">
                <form onSubmit={submitHandler}>
                    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-md">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-black">Create an event</h1>
                        <div>
                            <label className="block mb-1 text-black font-semibold">Title</label>
                            <input value={title} onChange={handleChangeTitle} required type="text" className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full" />
                        </div>

                        <div>
                            <label className="block mb-1 text-black font-semibold">Description</label>
                            <textarea value={desc} onChange={handleChangeDesc} required rows="3" type="text" className="bg-indigo-100 px-4 py-2 outline-none rounded-md w-full"></textarea>
                        </div>

                        <div>
                            <label className="block mb-1 text-black font-semibold">Date and Time</label>
                            <input value={date} onChange={handleChangeDate} required type="date" className="bg-indigo-100 px-4 py-2 outline-none rounded-t-md w-full" />
                            <input value={time} onChange={handleChangeTime} required type="time" className="bg-indigo-100 px-4 py-2 outline-none rounded-b-md w-full" />
                        </div>

                        <div>
                            <label className="block mb-1 text-black font-semibold">Geolocation</label>
                            <FileBase64 
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setCover(base64 )}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-black font-semibold">Geolocation</label>

                            <MapPicker 
                                style={{height:'300px'}}
                                defaultLocation={defaultLocation}
                                zoom={zoom}
                                mapTypeId="hybrid"
                                onChangeLocation={handleChangeLocation} 
                                onChangeZoom={handleChangeZoom}
                                apiKey='AIzaSyCsR3jtNYcBGuwGfn5Q56g6xFwDj7rjh_0'
                            />
                        </div>
                    </div>

                    <input type="submit" className="mt-4 w-full font-bold bg-green-600 text-white py-2 hover:cursor-pointer rounded-md" value="Create" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventForm;