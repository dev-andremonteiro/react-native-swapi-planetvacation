import React from "react";
import { View, Text } from "react-native";
import axios from "axios";

//Arbritary (For design prupose)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const users = [
  {
    name: "R2-D2",
    avatar: "https://starwars-visualguide.com/assets/img/characters/3.jpg"
  },
  {
    name: "Leia Organa",
    avatar: "https://starwars-visualguide.com/assets/img/characters/5.jpg"
  },
  {
    name: "Finis Valorum",
    avatar: "https://starwars-visualguide.com/assets/img/characters/34.jpg"
  },
  {
    name: "Luke Skywalker",
    avatar: "https://starwars-visualguide.com/assets/img/characters/1.jpg"
  },
  {
    name: "Owen Lars",
    avatar: "https://starwars-visualguide.com/assets/img/characters/6.jpg"
  }
];
const galaxies = [
  "Galaxy BX32",
  "Galaxy Andromeda",
  "Galaxy Gama45",
  "Galaxy XZ65",
  "Galaxy Beta3"
];
//

class Load extends React.Component {
  state = {
    loading: true,
    planets: []
  };

  count = 1;

  componentDidMount() {
    //Choose random planets from the list to show.
    //We need 5 planets from the list, randomize a number and get the next 4 planets.
    //There are 10 planets on the API.

    const planetIndex = Math.round(getRandomArbitrary(0, 5));
    console.log(planetIndex);

    axios.get(`https://swapi.co/api/planets/`).then(res => {
      const response = res.data;
      const planetsNormalized = response.results
        .slice(planetIndex, planetIndex + 5)
        .map(i => this.planetsDataNormalizing(i));
      this.setState({ planets: planetsNormalized, loading: false });
      this.props.navigation.navigate("List", {
        planets: this.state.planets
      });
    });
  }

  planetsDataNormalizing(planet) {
    const {
      name,
      climate,
      gravity,
      diameter,
      rotation_period,
      population,
      surface_water,
      terrain
    } = planet;
    let normClimate = climate.split(",")[0];
    let normGravity = gravity.split(" ")[0];
    let normPop = parseInt(population) / 1000;
    if (normPop === NaN) normPop = 0;
    let automaticDescription = `This planet has a diameter of ${diameter}km and a population of ${
      normPop === 0 ? "zero" : normPop + "k"
    } citizens. The day there takes ${rotation_period} hours and ${surface_water} % of the planet is under water. The most dominant terrain ${
      terrain.indexOf(",") === -1 ? "is" : "are"
    } ${terrain}.`;

    /** Made up numbers for design of the Travel App */

    const cost = getRandomArbitrary(1, 9); //Number of cost of the trip. (1.00 - 7.00) unit: Millions of Bit Coins
    const reviews = getRandomArbitrary(1000, 9000); //Number of reviews (3000 - 10 000) unit: N/A
    const distance = getRandomArbitrary(1, 200); //Distance between you and the planet (1 - 200) unit: Light Years

    const planetImageToShow = Math.round(getRandomArbitrary(2, 19)); // Website only contains images between 2 - 19.

    const finalPlanet = {
      id: this.count++,
      name: name,
      galaxy: galaxies[this.count - 2],
      user: users[this.count - 2],
      rating: Math.floor(getRandomArbitrary(3, 5) * 10) / 10,
      reviews: reviews,
      cost: cost,
      distance: distance,
      climate: normClimate,
      gravity: normGravity,
      description: automaticDescription,
      amenities: [0, 1, 2],
      image: `https://starwars-visualguide.com/assets/img/planets/${planetImageToShow}.jpg`
    };

    return finalPlanet;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
}

export default Load;
