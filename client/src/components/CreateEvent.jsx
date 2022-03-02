import React, { useState, useRef, useMemo, useCallback } from "react";
import MapPicker from 'react-google-map-picker';
import axios from 'axios'; 
import FileBase64 from 'react-file-base64';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const DefaultLocation = { lat: 42.6977, lng: 23.3219};
const DefaultZoom = 15;

const options = ["Advertising", "Agriculture", "Architecture", "Aviation", "Investment banking", "Online banking", "Retail banking", "Business", "Construction", "Fashion design", "Graphic design", "Interior design", "Economics", "Engineering", "Entrepreneurship", "Health care", "Higher education", "Management", "Marketing", "Nursing", "Digital marketing", "Display advertising", "Email marketing", "Online advertising", "Search engine optimization", "Social media", "Social media marketing", "Web design", "Web development", "Web hosting", "Creditcards", "Insurance", "Investment", "Mortgage loans", "Real estate", "Retail", "Sales", "Science", "Small business", "Action games", "Board games", "Browser games", "Card games", "Casino games", "First-person shooter games", "Gambling", "Massively multiplayer online games", "Massively multiplayer online role-playing games", "Online games", "Online poker", "Puzzle video games", "Racing games", "Role-playing games", "Shooter games", "Simulation games", "Sports games", "Strategy games", "Video games", "Word games", "Ballet", "Bars", "Concerts", "Dancehalls", "Music festivals", "Nightclubs", "Parties", "Plays", "Theatre", "Action movies", "Animated movies", "Anime movies", "Bollywood movies", "Comedy movies", "Documentary movies", "Drama movies", "Fantasy movies", "Horror movies", "Musical theatre", "Science fiction movies", "Thriller movies", "Blues music", "Classical music", "Country music", "Dance music", "Electronic music", "Gospel music", "Heavy metal music", "Hip hop music", "Jazz music", "Music videos", "Pop music", "Rhythm and blues music", "Rock music", "Soul music", "Books", "Comics", "E-books", "Fiction books", "Literature", "Magazines", "Manga", "Mystery fiction", "Newspapers", "Non-fiction books", "Romance novels", "TV comedies", "TV game shows", "TV reality shows", "TV talkshows", "Dating", "Family", "Fatherhood", "Friendship", "Marriage", "Motherhood", "Parenting", "Weddings", "Bodybuilding", "Meditation", "Physical exercise", "Physical fitness", "Running", "Weight training", "Yoga", "Chinese cuisine", "French cuisine", "German cuisine", "Greek cuisine", "Indian cuisine", "Italian cuisine", "Japanese cuisine", "Korean cuisine", "Latin American cuisine", "Mexican cuisine", "Middle Eastern cuisine", "Spanish cuisine", "Thai cuisine", "Vietnamese cuisine", "Barbecue", "Chocolate", "Desserts", "Fast food", "Organic food", "Pizza", "Seafood", "Veganism", "Vegetarianism", "Coffeehouses", "Diners", "Fast-casual restaurants", "Fast food restaurants", "Acting", "Crafts", "Dance", "Drawing", "Drums", "Fine art", "Guitar", "Painting", "Performing arts", "Photography", "Sculpture", "Singing", "Writing", "Do it yourself (DIY)", "Furniture", "Gardening", "Home Appliances", "Home improvement", "Birds", "Cats", "Dogs", "Fish", "Horses", "Pet food", "Rabbits", "Reptiles", "Charity and causes", "Community issues", "Environmentalism", "Law", "Military", "Politics", "Religion", "Sustainability", "Veterans", "Volunteering", "Adventure travel", "Air travel", "Beaches", "Car rentals", "Cruises", "Ecotourism", "Hotels", "Lakes", "Mountains", "Nature", "Theme parks", "Tourism", "Vacations", "Automobiles", "Boats", "Electric vehicle", "Hybrids", "Minivans", "Motorcycles", "RVs", "SUVs", "Scooters", "Trucks", "Boating", "Camping", "Fishing", "Horseback riding", "Hunting", "Mountain biking", "Surfing", "American football", "Association football (Soccer)", "Auto racing", "Baseball", "Basketball", "College football", "Golf", "Marathons", "Skiing", "Snowboarding", "Swimming", "Tennis", "Triathlons", "Volleyball", "Software", "Cameras", "Smartphones", "Computers", "Open-source"];

function EventForm()
{
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [cover, setCover] = useState("");
    const [tags, setTags] = useState([]);

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    const navigate = useNavigate();

    function handleChangeLocation(lat, lng)
    {
        setLocation({lat: lat, lng: lng});
        console.log(location);
    }

    function handleChangeZoom(newZoom)
    {
        setZoom(newZoom);
    }

    let tagss = options.map((str, index) => ({ value: str, label: str }));

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

    const handleChangeTags = (selectedOptions) => {
        const selectedTags = selectedOptions.map(a => a.value);
        setTags(selectedTags);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setTitle("");
        setDesc("");
        setTime("");
        setDate("");
        setCover("");
        setTags([]);
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
           ],
           tags: tags
        };

        const jmtoken = localStorage.jmtoken;
        axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/events/add', newEvent, {headers: {'jmtoken': `${jmtoken}` }})
            .then(res => console.log(res.data));

        var options = {
            body: "You just uploaded an event! Have fun!",
            dir: "auto"
        };

        new Notification("JoinMe", options);

        navigate('/profile');
    };

    return (
        <div className="bg-zinc-900">
            <div className="flex h-view justify-center items-center">
                <div className="lg:m-20 md:m-20 sm:m-10 h-view flex justify-center items-center w-full">

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

                            <div>
                                <label className="block mb-1 text-black font-semibold">Tags</label>

                                <Select
                                    isMulti={true}
                                    options={tagss}
                                    isSearchable={true}
                                    placeholder={"Select tags"}
                                    onChange={handleChangeTags}
                                />                         
                            </div>
                        </div>

                        <input type="submit" className="mt-4 w-full font-bold bg-green-600 text-white py-2 hover:cursor-pointer rounded-md" value="Create" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EventForm;