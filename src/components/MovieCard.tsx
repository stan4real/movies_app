import { Movie } from "../helpers/types"
import star from "../assets/svg/star.svg"
import noImg from "../assets/img/no-image.png"

const MovieCard = ({movie : 
    {title, vote_average, poster_path, release_date, original_language}
}:{movie:Movie}) => {
  return (
    <div className="movie-card">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noImg} alt="title"/>
        <div className="mt-4">
            <h3>{title}</h3>
            <div className="content">
                <div className="rating">
                    <img src={star} alt="Star Icon"/>
                    <p className="">{vote_average ? vote_average.toFixed(1): 'N/A'}</p>
                </div>
                <span>•</span>
                <p className="lang">{original_language}</p>
                <span>•</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard