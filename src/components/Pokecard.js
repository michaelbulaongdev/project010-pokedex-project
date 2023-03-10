import {Card, CardContent, CardMedia, Typography} from '@mui/material';

export default function PokeCard(props) {
	return (
		<Card variant='outlined' className='card-container'>
			<CardContent>
				<h2 className='poke-name'>
					{props.name.replace(/-/g, ' ').toUpperCase()}
				</h2>
				<CardMedia className='img-container'>
					<img
						className='sprite-img'
						src={props.image}
						alt='pokemon profile pic'
					/>
				</CardMedia>
				<CardContent className='stats-container'>
					<Typography variant='body1'>Height: {props.height / 10} m</Typography>
					<Typography variant='body1'>
						Weight: {props.weight / 10} kg
					</Typography>
				</CardContent>
			</CardContent>
		</Card>
	);
}
