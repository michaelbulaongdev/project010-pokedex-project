import {Card, CardContent, CardMedia, Typography} from '@mui/material';

export default function PokeCard(props) {
	return (
		<Card className='card-container'>
			<CardContent>
				<h2 className='poke-name'>{props.name.toUpperCase()}</h2>
				<CardMedia className='img-container'>
					<img className='sprite-img' src={props.front} alt='front' />
					<img className='sprite-img' src={props.back} alt='back' />
				</CardMedia>
				<CardContent className='stats-container'>
					<Typography>Height: {props.height / 10} m</Typography>
					<Typography>Weight: {props.weight / 10} kg</Typography>
				</CardContent>
			</CardContent>
		</Card>
	);
}
