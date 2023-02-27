import {useState} from 'react';
import PokeCard from './components/Pokecard';

export default function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [input, setInput] = useState('');

	const fetchData = (api) => {
		fetch(api)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`No such pokemon: error ${response.status}`);
				}
				return response.json();
			})

			.then((response) => {
				setData(response);
				console.log(data);
				setError(null);
			})

			.catch((err) => {
				setError(err.message);
				setData(null);
			})

			.finally(() => {
				setLoading(false);
			});
	};

	const handleClick = () => {
		const rng1 = Array.from({length: 905}, (_, i) => i + 1);
		const rng2 = Array.from({length: 249}, (_, i) => i + 10001);
		const rng = rng1.concat(rng2);
		const rnd = Math.floor(Math.random() * 1154);
		const api = `https://pokeapi.co/api/v2/pokemon/${rng[rnd]}`;
		console.log(api);
		fetchData(api);
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter' && e.target.value !== '') {
			setInput(e.target.value);
			const api = `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`;
			console.log(api);
			fetchData(api);
		} else if (e.target.value === '') {
			setError('Enter pokemon name or number');
			setTimeout(() => {
				setError(null);
			}, 1500);
		}
	};

	return (
		<div className='app'>
			<h1 className='title'>The Pokedex Project</h1>
			<button className='random-btn' onClick={handleClick}>
				Pick random pokemon
			</button>
			<hr />
			<input
				className='search-bar'
				type='text'
				placeholder='or enter pokemon name/number...'
				onChange={handleChange}
				onKeyDown={handleEnter}
			/>

			{loading && <h3>Searching for pokemons...</h3>}
			{error && <div>{error}</div>}

			{data !== null && !loading && (
				<PokeCard
					key={data.id}
					name={data.name}
					height={data.height}
					weight={data.weight}
					front={data.sprites.front_default}
					back={data.sprites.back_default}
				/>
			)}
		</div>
	);
}
