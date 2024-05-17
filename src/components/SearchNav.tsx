import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchNav = () => {

	 const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    history.push(`/programs?search=${searchQuery}`);
    window.location.href = `/programs?search=${searchQuery}`;
  };
return (

<div>
    <div className="container">
    <div className="row align-items-end">
   
    <div className="col">
    <form className="mb-3" onSubmit={handleSubmit}>
    <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Search programs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-outline-dark" onClick={handleSubmit}>
              Search
            </button>
            </div>

          </form></div>
    </div>
    
    </div>
    </div>
	)


};

export default SearchNav;