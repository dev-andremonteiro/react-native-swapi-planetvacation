import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as theme from "../theme";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const { width, height } = Dimensions.get("window");

const amenitiesIcons = [
  { icon: "fighter-jet", desc: "Travel" },
  { icon: "bed", desc: "Hotel" },
  { icon: "camera", desc: "Guided Tour" },
  { icon: "glass", desc: "Open bar" }
];

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  header: {
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: "space-between",
    alignItems: "center"
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  content: {
    backgroundColor: theme.colors.white,
    padding: theme.sizes.padding,
    paddingBottom: 0,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.border,
    borderTopRightRadius: theme.sizes.border,
    marginTop: -theme.sizes.padding / 2,
    position: "relative"
  },
  avatar: {
    position: "absolute",
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: "bold"
  },
  specContainer: { alignItems: "flex-end", justifyContent: "space-around" },
  specs: {
    alignItems: "center",
    justifyContent: "center"
  },
  specTitle: {
    fontSize: theme.sizes.font * 2,
    fontWeight: "bold",
    marginBottom: 4
  },
  specDesc: {
    fontWeight: "200",
    color: theme.colors.dark
  }
});

class Planet extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={[styles.flex, styles.row, styles.header]}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome
              name="chevron-left"
              color={theme.colors.white}
              size={theme.sizes.font * 1}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              name="more-horiz"
              color={theme.colors.white}
              size={theme.sizes.font * 1.5}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTransparent: true
    };
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
    const { navigation } = this.props;
    const planet = navigation.getParam("data");

    return (
      <View style={styles.flex}>
        <StatusBar barStyle={"light-content"} />
        <View style={[{ flex: 0.5 }]}>
          <Image
            source={{ uri: planet.image }}
            resizeMode="cover"
            style={{ width, height: width }}
          />
        </View>
        <View style={[styles.flex, styles.content]}>
          <View
            style={{
              position: "absolute",
              top: -(theme.sizes.margin * 1.5),
              left: 0,
              backgroundColor: theme.colors.white,
              borderTopRightRadius: theme.sizes.border,
              borderBottomRightRadius: theme.sizes.border
            }}
          >
            <Text style={{ padding: 8, paddingLeft: 16 }}>
              ${planet.cost.toFixed(2)}M BC
            </Text>
          </View>

          <View style={[styles.avatar, styles.shadow]}>
            <Image
              source={{ uri: planet.user.avatar }}
              style={{ flex: 1, borderRadius: theme.sizes.padding }}
            />
          </View>

          <View
            style={[
              styles.row,
              { alignItems: "flex-end", justifyContent: "space-between" }
            ]}
          >
            <Text style={styles.title}>{planet.name}</Text>
            <Text
              style={{
                fontSize: theme.sizes.font * 0.75,
                fontWeight: "500",
                color: theme.colors.dark
              }}
            >
              hosted by{" "}
              <Text
                style={{
                  fontSize: theme.sizes.font * 0.75,
                  fontWeight: "bold",
                  color: theme.colors.black
                }}
              >
                {planet.user.name}
              </Text>
            </Text>
          </View>

          <View
            style={[
              styles.row,
              { alignItems: "center", marginVertical: theme.sizes.margin / 2 }
            ]}
          >
            {this.renderStars(planet.rating)}
            <Text
              style={{
                color: theme.colors.star,
                fontWeight: "600",
                marginLeft: 4
              }}
            >
              {planet.rating}
            </Text>
            <Text style={{ marginLeft: 8, color: theme.colors.dark }}>
              ({planet.reviews.toFixed(0)} reviews)
            </Text>
          </View>

          <View style={[styles.row, styles.specContainer]}>
            <View style={[styles.specs]}>
              <Text style={[styles.specTitle]}>
                {planet.gravity}
                <Text
                  style={[
                    {
                      fontSize: theme.sizes.font
                    }
                  ]}
                >
                  std
                </Text>
              </Text>
              <Text style={[styles.specDesc]}>Gravity</Text>
            </View>
            <View style={[styles.specs]}>
              <Text style={[styles.specTitle]}>
                {planet.distance.toFixed(0)}
                <Text
                  style={[
                    {
                      fontSize: theme.sizes.font
                    }
                  ]}
                >
                  LY
                </Text>
              </Text>
              <Text style={[styles.specDesc]}>Travel Distance</Text>
            </View>
            <View style={[styles.specs]}>
              <Text
                style={[
                  styles.specTitle,
                  { fontSize: theme.sizes.font * 1.25 }
                ]}
              >
                {planet.climate.capitalize()}
              </Text>
              <Text style={[styles.specDesc]}>Climate</Text>
            </View>
          </View>

          <Text style={[{ marginVertical: theme.sizes.margin * 0.5 }]}>
            {planet.description}
          </Text>

          <View
            style={[
              styles.flex,
              styles.row,
              { alignItems: "center", justifyContent: "space-around" }
            ]}
          >
            {planet.amenities.map((i, index) => (
              <View
                key={"amenities" + i}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <FontAwesome
                  name={amenitiesIcons[i].icon}
                  color={theme.colors.dark}
                  size={theme.sizes.font * 2}
                />
                <Text
                  style={{ fontSize: theme.sizes.font * 0.75, marginTop: 4 }}
                >
                  {amenitiesIcons[i].desc}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.flex,
              {
                backgroundColor: theme.colors.active,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.sizes.border,
                marginTop: 16,
                marginBottom: 8
              }
            ]}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: theme.colors.light
              }}
            >
              Check Availability
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Planet;
