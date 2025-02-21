import { useEffect, useState } from "react"
import hero from "./assets/img/hero-img.png"
import Search from "./components/Search"
import { Movie, MovieResponse } from "./helpers/types";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import { Models } from "appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Models.Document[] | undefined>([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(()=>setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMsg('')
    try {
      const endpoint = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
    
      if(!response.ok){
        throw new Error('Response is not ok')
      }

      const data = await response.json() as MovieResponse
      console.log(data)

      setMovieList(data.results || [])

      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0])
      }
    } catch (error) {
      console.error('Error fethcing movies', error)
      setErrorMsg('Error fethcing movies. Please try again later')
    } finally {
      setIsLoading(false)
    }
  }
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies() 
      
      setTrendingMovies(movies)
      console.log({movies})
      console.log('typeOfMovies', typeof(movies))
    } catch (error) {
      console.log('Error fetcing trending movies', error)
    }
  }

  useEffect(()=> {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(()=> {
    loadTrendingMovies()
  }, [])

  return (
    <main>
      <div className='pattern'/>
      
      <div className='wrapper'>
        <header>
          <img src={hero} alt='hero_banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll enjoy Without the Hassle</h1>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        </header>
        
        { trendingMovies && 
          trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id} >
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title}></img>
                </li>
              ))}
            </ul>
          </section>
          )
        }

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie)=> (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
          { errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </section>

      </div>
    </main>
  )
}

export default App
