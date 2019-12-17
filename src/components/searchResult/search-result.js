import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, TouchableWithoutFeedback, TextInput, ScrollView } from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

export default class SearchResult extends Component {
  state = {
    previousCityType: undefined,
    previousNearByType: undefined,
    tutorsList: [],
    cityTypes: [
      { label: 'Football', value: 'football' },
      { label: 'Baseball', value: 'baseball' },
      { label: 'Hockey', value: 'hockey' }
    ],
    nearByTypes: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
      { label: 'Three', value: 'three' }
    ],
    cityType: null,
    nearByType: null,
  };

  constructor(props) {
    super(props);

    this.inputRefs = {
      cityType: null,
      nearByType: null,
    };
  }

  InputAccessoryViewCity = () => {
    return (
      <View style={styles.modalViewMiddle}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                cityType: this.state.previousCityType
              },
              () => {
                this.inputRefs.cityType.togglePicker(true);
              }
            );
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text style={[styles.done, { color: "rgb(229,16,37)" }]}>
              Cancel
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={{
            color: "rgb(46,45,45)",
            fontFamily: "FuturaMedium",
            fontSize: 17
          }}
        >
          Type
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.inputRefs.cityType.togglePicker(true);
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text style={styles.done}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  InputAccessoryViewNearBy = () => {
    return (
      <View style={styles.modalViewMiddle}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                nearByType: this.state.previousNearByType
              },
              () => {
                this.inputRefs.nearByType.togglePicker(true);
              }
            );
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text style={[styles.done, { color: "rgb(229,16,37)" }]}>
              Cancel
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={{
            color: "rgb(46,45,45)",
            fontFamily: "FuturaMedium",
            fontSize: 17
          }}
        >
          Type
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.inputRefs.nearByType.togglePicker(true);
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text style={styles.done}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  apiDomain = "https://faheemapp.com/api-server";

  static navigationOptions = {
    headerTitle: "Search Result",
    headerStyle: {
      backgroundColor: "rgb(246,161,26)",
      borderColor: "rgb(246,161,26)",
      borderBottomWidth: 0
    },
    headerTintColor: "rgb(255,255,255)",
    headerTitleStyle: {
      flex: 1,
      textAlign: "left",
      fontFamily: "FuturaMedium",
      fontSize: 20,
      fontWeight: "normal",
      color: "white"
    },
    headerTitleContainerStyle: {
      flex: 1,
      width: "100%"
    },
    headerLeftContainerStyle: {
      color: "white"
    }
  };

  // async componentDidMount() {
  //   const tutorsListUrl = `${this.apiDomain}/api/search/tutors`;
  //   const params = {
  //     api_key_val: "1",
  //     student_id: 333,
  //     lat: 26.236126,
  //     long: 50.039303,
  //     keyword: this.props.navigation.getParam('input'),
  //     location_id: this.props.navigation.getParam('type')
  //   };
  //   await axios
  //     .post(tutorsListUrl, params)
  //     .then(response => {
  //       console.log("Tutors List from screen two", response.data);
  //     })
  //     .catch(error => {
  //       console.log(" print the error ", error);
  //     });
  // }

  render() {
    const placeholder = {
      label: "City",
      value: null,
      color: "rgb(192,192,192)"
    };
    const placeholderNearby = {
      label: "Near by",
      value: null,
      color: "rgb(192,192,192)"
    };

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}
          >

        <View style={ styles.pickerWithInput } >
          <View style={ styles.pickerParent }>
            <RNPickerSelect
              placeholder={ placeholder }
              items={ this.state.cityTypes }
              value={ this.state.cityType }
              onValueChange={ value => {
                this.setState({
                  cityType: value
                });
              }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 12
                },
                modalViewBottom: {
                  backgroundColor: "rgb(247,247,247)"
                }
              }}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return (
                  <Image
                    source={require("../../../assets/images/bottom.png")}
                    style={{ width: 10, height: 6 }}
                  />
                );
              }}
              onOpen={() => {
                this.setState({
                  previousCityType: this.state.cityType
                });
              }}
              InputAccessoryView={this.InputAccessoryViewCity}
              ref={ref => {
                this.inputRefs.cityType = ref;
              }}
            />
          </View>
          <View style={ styles.inputParent }>
            <TextInput 
              placeholder="Search Here..."
              placeholderTextColor="rgb(192,192,192)"
              style={ styles.inputField }
            />
            <TouchableOpacity
              style={ styles.searchBtn }
            >
              <Image 
                source={ require('../../../assets/images/search-icon.png') }
                style={ styles.searchIcon }
              />
            </TouchableOpacity>
          </View>
          </View>
          <View style={ styles.advanceTextParent }>
            <Text style={ styles.advanceText }>Advanced Search?</Text>
          </View>
          <RNPickerSelect
            placeholder={ placeholderNearby }
            items={ this.state.nearByTypes }
            value={ this.state.nearByType }
            onValueChange={ value => {
              this.setState({
                nearByType: value
              });
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                  top: 20,
                  right: 12
              },
              modalViewBottom: {
                backgroundColor: "rgb(247,247,247)"
              }
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Image
                  source={require("../../../assets/images/bottom.png")}
                  style={{ width: 10, height: 6 }}
                />
              );
            }}
            onOpen={() => {
              this.setState({
                previousNearByType: this.state.nearByType
              });
            }}
            InputAccessoryView={this.InputAccessoryViewNearBy}
            ref={ref => {
              this.inputRefs.nearByType = ref;
            }}
          />
          
          <View style={ styles.cardWrappers }>

            {/* cardItem */}
            <View style={ styles.cardItem }>
              <View
                style={ styles.imageDetailsPrice }
              >
                <View style={ styles.personalImageParent }>
                  <View style={ styles.firstImageWrapper }>
                    <View
                      style={ styles.secondImageWrapper }
                    >
                      <Image 
                        source={ require('../../../assets/images/ahmad.png') }
                        style={ styles.personalIcon }
                        resizeMode="cover"
                      />
                    </View>
                  </View>

                  <View 
                    style={ styles.personalDetailsParent }
                  >
                    <View style={ styles.tutorNameWrapper }>
                      <Text style={ styles.tutorNameText } >Abdul Kareem</Text>
                    </View>

                    <View style={ styles.rateWrapper }>
                      <Image 
                        source={ require('../../../assets/images/start.png') }
                        style={ styles.starIcon }
                      />
                      <Image 
                        source={ require('../../../assets/images/start.png') }
                        style={ styles.starIcon }
                      />
                      <Image 
                        source={ require('../../../assets/images/start.png') }
                        style={ styles.starIcon }
                      />
                      <Image 
                        source={ require('../../../assets/images/start.png') }
                        style={ styles.starIcon }
                      />
                      <Image 
                        source={ require('../../../assets/images/start.png') }
                        style={ styles.starIcon }
                      />
                    </View>

                    <View style={ styles.UniversitySpecialization }>
                      <View>
                        <Image
                          source={ require('../../../assets/images/students-cap.png') }
                          style={ styles.studentsCapIcon }
                        />
                      </View>

                      <View>
                        <Text style={ styles.UniversitySpecializationText } >Bachelor Student - qualification</Text>
                      </View>

                    </View>
                  </View>
                </View>





                <View style={ styles.priceParent }>
                  <Text style={ styles.priceText } >SR 93</Text>
                  <Text style={ styles.priceText }>per hour</Text>
                </View>
              </View>


              <View style={ styles.categoriesParent }>
                <View style={ styles.categoriesWrapper }>
                  <Text style={ styles.categoriesText }>Mathematics</Text>
                </View>
                <View style={ styles.categoriesWrapper }>
                  <Text style={ styles.categoriesText }>Math 001</Text>
                </View>
                <View style={ styles.categoriesWrapper }>
                  <Text style={ styles.categoriesText }>ICS 103</Text>
                </View>
                <View style={ styles.categoriesWrapper }>
                  <Text style={ styles.categoriesText }>English</Text>
                </View>
                <View style={ styles.categoriesWrapper }>
                  <Text style={ styles.categoriesText }>Biology</Text>
                </View>
                <View style={ styles.categoriesWrapper }>
                  <Text style={ styles.categoriesText }>ICS 103</Text>
                </View>
                <View style={ styles.categoriesWrapper }>
                  <Text style={ styles.categoriesText }>ICS 103</Text>
                </View>
              </View>
            </View>
          </View>
          </ScrollView>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingTop: 25,
    paddingBottom: 70,
    paddingHorizontal: 20
  },
  pickerWithInput: { 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerParent: { 
    width: '33%'
  },
  inputParent: { 
    width: '63%', 
    borderRadius: 5, 
    borderWidth: 1,
    borderColor: 'black', 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 45,
    borderColor: "rgb(224,224,224)",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(0,0,0,0.18)",
    shadowOpacity: 1.0,
    overflow: 'hidden',
  },
  inputField: { 
    padding: 10, 
    width: '80%', 
    height: '100%',
  },
  searchBtn: { 
    width: '20%', 
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'orange'
  },
  searchIcon: { 
    width: 20,
    height: 20
  },
  advanceTextParent: { 
    marginVertical: 10,
  },
  advanceText: {
    fontFamily: "FuturaMedium",
    color: "rgb(246,161,26)",
    fontSize: 20
  },
  modalViewMiddle: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "rgb(233,233,233)",
    borderTopWidth: 0.5,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    overflow: "hidden",
    borderTopColor: "rgb(233,233,233)",
    zIndex: 2,
    borderBottomColor: "rgb(246,161,26)",
    borderBottomWidth: 2
  },
  done: {
    color: "rgb(46,45,45)",
    fontFamily: "FuturaLight",
    fontSize: 15,
    paddingTop: 1,
    paddingRight: 2
  },
  cardWrappers: {
    marginVertical: 15,
  },
  cardItem: {
    marginBottom: 10,
    padding: 10, 
    borderWidth: 1,
    borderColor: 'rgba(254,0,0,0.3)',
    
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(254,0,0,0.3)",
    shadowOpacity: 1.0,
    elevation: 1,

    borderRadius: 5
  },
  imageDetailsPrice: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgb(240,240,240)',
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: '100%',
  },
  personalImageParent: {
    alignItems: 'center',
    width: '80%',
    // backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  firstImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '30%'
  },
  secondImageWrapper: { 
    borderRadius: 60,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(254,0,0,0.09)'
  },
  personalIcon: { 
    width: 60,
    height: 60
  },
  personalDetailsParent: {
    padding: 5,
    // backgroundColor: 'red',
    width: '70%'
  },
  tutorNameWrapper: {
    marginBottom: 2
  },
  tutorNameText: { 
    fontFamily: 'FuturaMedium', 
    fontSize: 16, 
    marginBottom: 3,
  },
  rateWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    marginBottom: 2,
  },
  starIcon: { 
    width: 15, 
    height: 15, 
    marginRight: 3,
  },
  UniversitySpecialization: {
    flexDirection: 'row', 
    alignItems: 'center', 
    // backgroundColor: '#ccc'
  },
  studentsCapIcon: { 
    width: 20,
    height: 20,
    marginRight: 5,
  },
  UniversitySpecializationText: { 
    marginRight: 3, 
    color:"rgb(103,103,103)",
    fontFamily: 'FuturaLight', 
    fontSize: 14
  },
  priceParent: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '20%'
  },
  priceText: { 
    color:"rgb(103,103,103)",
    fontFamily: 'FuturaMedium',
    fontSize: 14
  },
  categoriesParent: { 
    marginTop: 8, 
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%', 
    flexWrap:'wrap',
  },
  categoriesWrapper: { 
    backgroundColor: 'rgb(246,161,26)', 
    marginRight: 2, 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 10, 
    marginBottom: 3 
  },
  categoriesText: { 
    color: 'white', 
    fontFamily: 'FuturaMedium'
  },


});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingVertical: 13,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(224,224,224)",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(0,0,0,0.09)",
    shadowOpacity: 1.0,
    color: "rgb(46,45,45)",
    fontSize: 15,
    fontFamily: "FuturaLight"
  },
  inputAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(224,224,224)",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(0,0,0,0.09)",
    shadowOpacity: 1.0,
    color: "rgb(46,45,45)",
    fontSize: 15,
    fontFamily: "FuturaLight"
  }
});
