class Pokecard extends React.Component {
  render() {
    const { id, name, type, image } = this.props;
    return (
      <div className="pokeCard">
        <h1>
          <b>{name}</b>
        </h1>
        <img src={image} alt="" />
        <p>{type}</p>
      </div>
    );
  }
}
