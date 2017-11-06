import React, { Component } from 'react';

class Pokemon extends Component {
    render() {
        let pokemonsComponents = [];
        for (let familia of Object.keys(this.props.pokemons)) {
            let pokemons = this.props.pokemons[familia];

            pokemonsComponents.push(<li key={familia}>{pokemons[0].familia}: {pokemons.length}</li>)
        }

        return (
            <ul>
                {pokemonsComponents}
            </ul>
        );
    }
}

Pokemon.propTypes = {
    pokemons: React.PropTypes.object
};

export default Pokemon;
