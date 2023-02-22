

function PokeCard (props) {
  return (
    <div className="card-container">
      <h2 className="poke-name">{props.name.toUpperCase()}</h2>
      <div className="img-container">
        <img className="sprite-img" src={props.front} alt="front" />
        <img className="sprite-img" src={props.back} alt="back" />
      </div>
      <div className="stats-container">
        <h3>Height: {props.height / 10} m</h3>
        <h3>Weight: {props.weight / 10} kg</h3>
      </div>
    </div>
  );
}

export default PokeCard;