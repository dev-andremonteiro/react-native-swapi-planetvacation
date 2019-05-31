import React, { Component } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as theme from "../theme";

const { width, height } = Dimensions.get("window");

const amenitiesIcons = ["fighter-jet", "bed", "camera", "glass"];

const visMock = [
  {
    id: 6,
    saved: true,
    galaxy: "Galaxy MW23",
    name: "Kamino",
    rating: 5,
    image: "https://starwars-visualguide.com/assets/img/planets/10.jpg"
  },
  {
    id: 7,
    saved: false,
    galaxy: "Galaxy Alpha0",
    name: "Mustafar",
    rating: 4.2,
    image: "https://starwars-visualguide.com/assets/img/planets/13.jpg"
  },
  {
    id: 8,
    saved: false,
    galaxy: "Galaxy G4221",
    name: "Saleucami",
    rating: 3.2,
    image: "https://starwars-visualguide.com/assets/img/planets/19.jpg"
  }
];

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding * 0.25,
    paddingTop: 24,
    paddingBottom: theme.sizes.padding * 0.25,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: theme.colors.light,
    borderBottomWidth: 1
  },
  searchBar: {
    paddingVertical: theme.sizes.padding * 0.33,
    borderRadius: theme.sizes.radius,
    backgroundColor: theme.colors.light,
    alignItems: "center",
    justifyContent: "center"
  },
  destinations: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: theme.sizes.padding * 0.25,
    paddingBottom: 8
  },
  destination: {
    width: width - theme.sizes.padding,
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin * 0.5,
    padding: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius
  },
  sectionHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: theme.sizes.padding * 0.5,
    marginTop: theme.sizes.margin * 0.66
  },
  recommendation: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.sizes.margin * 0.5,
    marginVertical: 8,
    height: height * 0.22,
    borderRadius: theme.sizes.border,
    overflow: "hidden"
  },
  recommendationImage: {
    width: width * 0.33
  },
  visited: {
    backgroundColor: theme.colors.white,
    width: (width - theme.sizes.padding * 2) / 2,
    marginHorizontal: 8,
    overflow: "hidden",
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14
  },
  visitedOptions: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: theme.sizes.padding / 2
  },
  visitedImage: {
    width: (width - theme.sizes.padding * 2) / 2,
    height: (width - theme.sizes.padding * 2) / 2
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2
  },
  rating: {
    fontSize: theme.sizes.font * 2,
    color: theme.colors.white,
    fontWeight: "bold"
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.light,
    borderColor: "transparent"
  },
  activeDot: {
    borderColor: theme.colors.active
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2
    }
  },
  sectionContainer: {
    flexDirection: "column",
    paddingTop: theme.sizes.padding * 0.66
  }
});

class ListOfPlanets extends Component {
  constructor() {
    super();

    this.state = {
      destinations: [],
      recommendations: []
    };
  }

  componentDidMount() {
    const { planets } = this.props.navigation.state.params;
    this.setState({
      destinations: planets.slice(0, 3),
      recommendations: planets.slice(3)
    });
  }

  scrollX = new Animated.Value(0);

  static navigationOptions = {
    header: (
      <View style={[styles.flex, styles.row, styles.header]}>
        <View style={[styles.flex, styles.row, styles.searchBar]}>
          <FontAwesome
            name="search"
            size={theme.sizes.font * 0.9}
            color={theme.colors.dark}
            style={{ marginRight: theme.sizes.margin * 0.2 }}
          />
          <Text
            style={{
              color: theme.colors.dark
            }}
          >
            Search
          </Text>
        </View>
        <Image
          style={[styles.avatar, { marginLeft: theme.sizes.margin * 0.2 }]}
          source={{ uri: "https://randomuser.me/api/portraits/women/58.jpg" }}
        />
      </View>
    )
  };

  renderDots() {
    const { destinations } = this.state;
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View
        style={[
          styles.flex,
          styles.row,
          {
            justifyContent: "center",
            alignItems: "center",
            marginTop: theme.sizes.margin * 0.5
          }
        ]}
      >
        {destinations.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 5, 0]
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[
                styles.dots,
                styles.activeDot,
                { borderWidth: borderWidth }
              ]}
            />
          );
        })}
      </View>
    );
  }

  renderDestinations = () => {
    const { destinations } = this.state;
    return (
      <View style={[styles.column, styles.destinations]}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={[{ overflow: "visible" }, styles.shadow]}
          data={destinations}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } }
          ])}
          renderItem={({ item }) => this.renderDestination(item)}
        />
        {this.renderDots()}
      </View>
    );
  };

  renderDestination = item => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Planet", { data: item })}
      >
        <ImageBackground
          style={[styles.flex, styles.destination]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{ uri: item.image }}
        >
          <View
            style={[styles.flex, styles.column, { justifyContent: "flex-end" }]}
          >
            <View>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: theme.sizes.font * 2,
                  fontWeight: "bold",
                  marginBottom: theme.sizes.margin * 0.2
                }}
              >
                {item.name}
              </Text>
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <View style={{ flex: 0 }}>
                <Image
                  source={{ uri: item.user.avatar }}
                  style={styles.avatar}
                />
              </View>
              <View
                style={[
                  styles.column,
                  { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }
                ]}
              >
                <Text style={{ color: theme.colors.white, fontWeight: "bold" }}>
                  {item.user.name}
                </Text>
                <Text style={{ color: theme.colors.white }}>
                  <FontAwesome
                    name="map-marker"
                    size={theme.sizes.font}
                    color={theme.colors.white}
                  />
                  <Text> {item.galaxy}</Text>
                </Text>
              </View>
              <View
                style={{
                  flex: 0,
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  renderRecommendations = () => {
    const { recommendations } = this.state;
    return (
      <View style={[styles.flex, styles.column]}>
        <View style={[styles.row, styles.sectionHeader]}>
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Recommended</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: theme.colors.dark }}>More</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.shadow, styles.sectionContainer]}>
          {recommendations.map((item, index) =>
            this.renderRecommendation(item, index)
          )}
        </View>
      </View>
    );
  };

  renderRecommendation = (item, index) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        key={`${item.id}`}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Planet", { data: item })}
      >
        <View
          style={[
            styles.flex,
            styles.row,
            styles.recommendation,
            index === 0 && { marginTop: 0 }
          ]}
        >
          <Image
            style={[styles.recommendationImage]}
            source={{ uri: item.image }}
          />
          <View
            style={[
              styles.flex,
              styles.column,
              { padding: theme.sizes.padding * 0.5, position: "relative" }
            ]}
          >
            <View>
              <View style={[styles.row]}>{this.renderStars(item.rating)}</View>
              <Text
                style={{
                  fontSize: theme.sizes.font * 1.4,
                  fontWeight: "500",
                  paddingTop: 2
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: theme.colors.dark,
                  fontSize: theme.sizes.font,
                  marginVertical: 4
                }}
              >
                {item.galaxy}
              </Text>
            </View>

            <View style={[styles.flex, styles.row, { alignItems: "flex-end" }]}>
              {item.amenities.map((i, index) => (
                <FontAwesome
                  key={"amenities" + i}
                  name={amenitiesIcons[i]}
                  color={theme.colors.dark}
                  size={theme.sizes.font * 1.1}
                  style={
                    index !== 0 && { marginLeft: theme.sizes.margin * 0.3 }
                  }
                />
              ))}
            </View>

            {index === 0 && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: theme.sizes.padding * 0.5,
                  backgroundColor: theme.colors.alert
                }}
              >
                <Text
                  style={{
                    padding: 4,
                    paddingHorizontal: 8,
                    fontSize: theme.sizes.font * 0.75,
                    color: theme.colors.white
                  }}
                >
                  25% OFF
                </Text>
              </View>
            )}

            <View
              style={{
                position: "absolute",
                right: 0,
                top: theme.sizes.margin * 1.25,
                backgroundColor: theme.colors.white
              }}
            >
              <Text
                style={[
                  {
                    fontSize: theme.sizes.font * 0.75,
                    padding: 8
                  }
                ]}
              >
                4 days
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: "10%",
                backgroundColor: theme.colors.white
              }}
            >
              <View
                style={[
                  styles.row,
                  {
                    alignItems: "center",
                    padding: 4,
                    paddingRight: 8
                  }
                ]}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginRight: 2,
                    fontSize: theme.sizes.font * 0.7
                  }}
                >
                  {index === 0 ? "FROM" : ""}
                </Text>

                <Text
                  style={{
                    fontSize: theme.sizes.font * 0.7,
                    textDecorationLine: "line-through"
                  }}
                >
                  {index === 0
                    ? "$" + (item.cost * 1.2).toFixed(2) + "M BC"
                    : ""}
                </Text>
              </View>
              <Text
                style={[
                  {
                    alignSelf: "flex-end",
                    fontSize: theme.sizes.font * 0.7,
                    padding: 8,
                    paddingLeft: 0
                  },
                  index === 0 && { color: theme.colors.alert }
                ]}
              >
                ${item.cost.toFixed(2)}M BC
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderVisitedsRecently = () => {
    return (
      <View style={[styles.flex, styles.column]}>
        <View style={[styles.row, styles.sectionHeader]}>
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>
            Planets you visited
          </Text>
        </View>
        <View style={[styles.sectionContainer]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[{ overflow: "visible" }, styles.shadow]}
            data={this.props.visited}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => this.renderVisited(item, index)}
          />
        </View>
      </View>
    );
  };

  renderVisited = (item, index) => {
    const { visited } = this.props;
    const isLastItem = index === visited.length - 1;
    return (
      <View
        style={[
          styles.flex,
          styles.column,
          styles.visited,
          index === 0 ? { marginLeft: theme.sizes.margin * 0.5 } : null,
          isLastItem ? { marginRight: theme.sizes.margin * 0.5 } : null
        ]}
      >
        <ImageBackground
          style={[styles.flex, styles.visitedImage]}
          source={{ uri: item.image }}
        >
          <View style={[styles.flex, styles.column, styles.visitedOptions]}>
            <FontAwesome
              name={item.saved ? "bookmark" : "bookmark-o"}
              color={theme.colors.white}
              size={theme.sizes.font * 1.25}
            />
            <View style={[styles.row]}>{this.renderStars(item.rating)}</View>
          </View>
        </ImageBackground>
        <View
          style={[
            styles.flex,
            styles.column,
            { justifyContent: "space-evenly", padding: theme.sizes.padding / 2 }
          ]}
        >
          <Text
            style={{
              fontSize: theme.sizes.font * 1.25,
              fontWeight: "500",
              paddingBottom: theme.sizes.padding / 4.5
            }}
          >
            {item.name}
          </Text>
          <Text style={{ color: theme.colors.dark }}>{item.galaxy}</Text>
        </View>
      </View>
    );
  };

  renderStars = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      const isLastItem = 4;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={theme.sizes.font}
          color={activeStar ? theme.colors.star : theme.colors.light}
          style={[
            { margin: 2 },
            index === isLastItem && { marginRight: 0 },
            index === 0 && { marginLeft: 0 }
          ]}
        />
      );
    });
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle={"default"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: theme.sizes.padding
          }}
        >
          {this.renderDestinations()}
          {this.renderRecommendations()}
          {this.renderVisitedsRecently()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ListOfPlanets.defaultProps = {
  visited: visMock
};

export default ListOfPlanets;
