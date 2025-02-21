import React, { SetStateAction } from "react"
import search from "../assets/svg/search.svg"

type SearchProps = {
    searchTerm:string,
    setSearchTerm:React.Dispatch<SetStateAction<string>>
}

const Search = ({searchTerm, setSearchTerm}:SearchProps) => {
  return (
    <div className='search' >
        <div>
            <img src={search} alt='search'/>

            <input
                type="text"
                placeholder="Search through thousands of movies"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search