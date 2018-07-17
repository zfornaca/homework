class Pokedex extends React.Component {
  render() {
    const pokemonList = this.props.pokemon.map(pokemonObj => (
      <div key={pokemonObj.id}>
        <Pokecard
          id={pokemonObj.id}
          name={pokemonObj.name}
          type={pokemonObj.type}
          image={pokemonObj.image}
        />
      </div>
    ));
    return <div className="pokeDex">{pokemonList}</div>;
  }
}

Pokedex.defaultProps = {
  pokemon: [
    {
      id: 1,
      name: 'Charmander',
      type: 'fire',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
    },
    {
      id: 2,
      name: 'Squirtle',
      type: 'water',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
    },
    {
      id: 3,
      name: 'Butterfree',
      type: 'flying',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png'
    },
    {
      id: 4,
      name: 'Rattata',
      type: 'normal',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png'
    },
    {
      id: 5,
      name: 'Metapod',
      type: 'bug',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png'
    }
  ]
};
