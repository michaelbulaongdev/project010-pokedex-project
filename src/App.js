import {useState} from 'react';
import axios from 'axios';
import {Box, Button, TextField, Typography} from '@mui/material';
import PokeCard from './components/Pokecard';

export default function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [input, setInput] = useState('');

	// const fetchData = async (api) => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await fetch(api, {
	// 			method: 'GET',
	// 			headers: {
	// 				Accept: 'application/json',
	// 			},
	// 		});
	// 		if (!response.ok) {
	// 			throw new Error(`Code ${response.status}: No pokemon found!`);
	// 		}
	// 		const result = await response.json();
	// 		setData(result);
	// 		setError(null);
	// 	} catch (err) {
	// 		setError(err.message);
	// 		setData(null);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	const fetchData = async (api) => {
		setLoading(true);
		try {
			const {data} = await axios.get(api, {
				headers: {
					Accept: 'application/json',
				},
			});
			setData(data);
		} catch (error) {
			setError('No pokemon found!');
		} finally {
			setLoading(false);
		}
	};

	const handleClick = () => {
		setData(null);
		setInput('');
		setError(null);
		const rng1 = Array.from({length: 905}, (_, i) => i + 1);
		const rng2 = Array.from({length: 249}, (_, i) => i + 10001);
		const rng = rng1.concat(rng2);
		const rnd = Math.floor(Math.random() * 1154);
		const api = `https://pokeapi.co/api/v2/pokemon/${rng[rnd]}`;
		fetchData(api);
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleEnter = (e) => {
		setData(null);
		setError(null);
		if (e.key === 'Enter' && e.target.value !== '') {
			setInput(e.target.value);
			const api = `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`;
			fetchData(api);
		} else if (e.target.value === '') {
			setError(null);
		}
	};

	return (
		<Box className='app'>
			<Typography variant='h3' className='title'>
				Pokedex Project
			</Typography>
			<Box sx={{display: 'flex', flexDirection: 'column'}}>
				<Button
					sx={{my: 3}}
					variant='contained'
					size='large'
					onClick={handleClick}>
					find random pokemon
				</Button>
				<TextField
					type='search'
					label='Enter pokemon name or number'
					value={input}
					onChange={handleChange}
					onKeyDown={handleEnter}
				/>
			</Box>
			<Box mt={3}>
				{loading && <Typography variant='h6'>Catching pokemon...</Typography>}

				{error && <Typography variant='h6'>{error}</Typography>}

				{data !== null && !loading && (
					<PokeCard
						key={data.id}
						name={data.name}
						height={data.height}
						weight={data.weight}
						image={data.sprites.front_default}
						loading={loading}
					/>
				)}
			</Box>
		</Box>
	);
}
