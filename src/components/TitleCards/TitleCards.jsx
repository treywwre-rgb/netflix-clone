import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
// import cards_data from '../../../data/cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {


	const [apiData, setApiData] = useState([]);
	const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2I5YWFjMWU0Yzc1MTMzMjcyYjhhNDU4Yjg1N2ZjNiIsIm5iZiI6MTc4Mzg4MTEzMy43MzMsInN1YiI6IjZhNTNkZGFkYmQyODg1NzQxODM0NzU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Om1JzFxfM0xZEziUknupXg-523-MdxUlvNua28G_Vxw'}
};


const handleWheel = (event) => {
	event.preventDefault();
	cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() => {
	
	async function getData () {
		await fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

	cardsRef.current.addEventListener('wheel', handleWheel)
	}
	getData()
}, []);

	return (
		<div className="title-cards">
			<h2>{title?title:'Popular on Netflix'}</h2>
			<div className="card-list" ref={cardsRef}>
				{apiData.map((card, index) => {
					return <Link to={`/player/${card.id}`} className="card" key={index}>
						<img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
						<p>{card.original_title}</p>
					</Link>;
				})}
			</div>
		</div>
	);
};

export default TitleCards;
