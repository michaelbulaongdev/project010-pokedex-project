import {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import PokeCard from './components/Pokecard';

export default function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [input, setInput] = useState('');

	const fetchData = async () => {
		setLoading(true);

		try {
			const response = await fetch('https://reqres.in/api/users', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Error! status: ${response.status}`);
			}

			const result = await response.json();

			console.log('result is: ', JSON.stringify(result, null, 4));

			setData(result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleClick = () => {
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
				The Pokedex Project
			</Typography>
			<Box sx={{display: 'flex', flexDirection: 'column'}}>
				<Button
					sx={{my: 3}}
					variant='outlined'
					size='large'
					onClick={handleClick}>
					Pick random pokemon
				</Button>
				<TextField
					type='search'
					label='Enter pokemon name/number'
					onChange={handleChange}
					onKeyDown={handleEnter}
				/>
			</Box>
			<Box>
				{loading && (
					<Typography variant='subtitle2'>Enter pokemon name/number</Typography>
				)}

				{error && <Typography variant='subtitle2'>{error}</Typography>}

				{data !== null && !loading && (
					<Box mt={3}>
						<PokeCard
							key={data.id}
							name={data.name}
							height={data.height}
							weight={data.weight}
							image={data.sprites.front_default}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
}
