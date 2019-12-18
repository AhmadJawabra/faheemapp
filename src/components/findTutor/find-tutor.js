import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DropdownAlert from "react-native-dropdownalert";
import axios from "axios";


export default class FindTutor extends Component {
  state = {
    previousType: undefined,
    previousNearByType: undefined,
    type: null,
    types: [],
    input: '',
    toggleSearch: false,
    nearByTypes: [
      { label: "One", value: "one" },
      { label: "Two", value: "two" },
      { label: "Three", value: "three" }
    ],
    nearByType: null,
  };


  handleToggleSearch = () => {
    this.setState({ toggleSearch: !this.state.toggleSearch });
  }



  apiDomain = "https://faheemapp.com/api-server";


  async componentDidMount() {
    const locationsUrl = `${this.apiDomain}/api/search/locations`;
    const params = {
      api_key_val: "1"
    }
    await axios
      .post( locationsUrl , params )
      .then( ( response ) => {
        let location = response.data;

        var destructuringData = location.reduce( ( emptyArray , obj ) => {
          emptyArray.push({label:obj.name , value:obj.id})
            return emptyArray;
        } , [] );
        this.setState({ types: destructuringData });
      })
      .catch( (error) => {
        this.dropDownAlertRef.alertWithType( "error", "get location data failed" , "Please check the endpoint" );
      })
  }

  constructor(props) {
    super(props);

    this.inputRefs = {
      type: null,
      nearByType: null,
    };
  }


  static navigationOptions = {
    headerBackTitle: null,
    headerTitle: "Find a Tutor",
    headerStyle: {
      backgroundColor: "rgb(246,161,26)",
      borderColor: "rgb(246,161,26)",
      borderBottomWidth: 0
    },
    headerTintColor: "rgb(255,255,255)",
    headerTitleStyle: {
      textAlign: "center",
      flexGrow: 1,
      fontFamily: "FuturaMedium",
      fontSize: 22
    },
    headerLeft: null
  };

  InputAccessoryView = () => {
    return (
      <View style={styles.modalViewMiddle}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                type: this.state.previousType
              },
              () => {
                this.inputRefs.type.togglePicker(true);
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
            this.inputRefs.type.togglePicker(true);
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
  };

  handleSubmit = async () => {
    if ( this.state.type === null || this.state.input === "" ) {
      this.dropDownAlertRef.alertWithType( "error", "Search Failed" , "Please do not forget to fill all of the field" );
    } else {
      this.props.navigation.navigate('SearchResult', { input: this.state.input , type: this.state.type } )
    }
  }

  render() {
    const placeholder = {
      label: "Select City",
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
        <View style={{ zIndex: 10 }}>
          <DropdownAlert
            ref={ref => (this.dropDownAlertRef = ref)}
            errorColor="#e51025"
            titleStyle={{
              color: "#FFF",
              fontFamily: "FuturaMedium",
              fontSize: 18
            }}
            messageStyle={{
              color: "#FFF",
              fontFamily: "FuturaMedium",
            }}
          />
        </View>
        <StatusBar barStyle="light-content" />

        <View style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
              style={{ flex: 1 }}
            >
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={45}
              >
                <View>
                  <Text style={styles.mainText}>
                    Compare the best teacher and choose the most appropriate
                  </Text>
                </View>
                <View style={styles.categoriesWrapper}>
                  <Text style={styles.categoryTitle}>
                    Here is best tutor in
                  </Text>
                  <Text style={styles.categoriesDepartments}>Engineering | Science | Business</Text>
                  <Text style={styles.categoriesDepartments}>Medicine | Law | English</Text>
                </View>
                <View style={styles.pickerParent}>
                  <RNPickerSelect
                    placeholder={ placeholder }
                    items={ this.state.types }
                    value={ this.state.type }
                    onValueChange={value => {
                      this.setState({
                        type: value
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
                        previousType: this.state.type
                      });
                    }}
                    InputAccessoryView={this.InputAccessoryView}
                    ref={ref => {
                      this.inputRefs.type = ref;
                    }}
                  />
                </View>
                <View style={styles.searchParent}>
                  <TextInput
                    placeholder="Search the course or test name"
                    placeholderTextColor="rgb(192,192,192)"
                    style={ styles.searchInput }
                    value={this.state.input}
                    onChangeText={ inputValue => this.setState({ input : inputValue })}
                  />
                  <TouchableOpacity 
                    onPress={ () => this.setState({ input: "" }) }
                    style={styles.cancelWrapper}
                  >
                    <Image
                      source={require("../../../assets/images/close.png")}
                      style={styles.cancelIcon}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.advanceTextParent}
                  onPress={ this.handleToggleSearch }
                >
                  <Text style={styles.advanceSearchText}>Advanced Search ?</Text>
                </TouchableOpacity>
                
                { this.state.toggleSearch === true ? (
                  <RNPickerSelect
                  placeholder={placeholderNearby}
                  items={this.state.nearByTypes}
                  value={this.state.nearByType}
                  onValueChange={value => {
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
                  onOpen={ () => {
                    this.setState({
                      previousNearByType: this.state.nearByType
                    });
                  }}
                  InputAccessoryView={this.InputAccessoryViewNearBy}
                  ref={ref => {
                    this.inputRefs.nearByType = ref;
                  }}
                />
                ) : null }
                
                


              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
        <View style={styles.searchBtnParent}>
          <TouchableOpacity 
            style={styles.searchBtn}
            onPress={ this.handleSubmit }
          >
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  scrollContentContainer: {
    paddingTop: 25,
    paddingBottom: 180,
  },
  mainText: {
    fontFamily: "FuturaMedium",
    fontSize: 20,
    textAlign: "center"
  },
  categoriesWrapper: {
    marginVertical: 20
  },
  categoryTitle: {
    fontFamily: "FuturaMedium",
    textAlign: "center",
    marginVertical: 20,
    color: "rgb(246,161,26)",
    fontSize: 20
  },
  categoriesDepartments: {
    fontFamily: "FuturaLight",
    color: "rgb(102,102,102)",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 30
  },
  pickerParent: {
    marginBottom: 15
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
  searchParent: {
    flexDirection: "row",
    height: 43,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(224,224,224)",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(0,0,0,0.18)",
    shadowOpacity: 1.0,
    marginBottom: 15
  },
  searchInput: {
    width: "90%",
    color: "rgb(46,45,45)",
    fontSize: 15,
    fontFamily: "FuturaLight",
    paddingHorizontal: 10
  },
  cancelWrapper: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelIcon: {
    width: 12,
    height: 12
  },
  advanceTextParent: {
    marginBottom: 15
  },
  advanceSearchText: {
    fontFamily: "FuturaLight",
    color: "rgb(102,102,102)",
    fontSize: 19
  },
  searchBtnParent: {
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  searchBtn: {
    backgroundColor: "rgb(246,161,26)",
    width: "90%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    elevation: 1,
    borderColor: "rgb(246,161,26)",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgba(0,0,0,0.18)",
    shadowOpacity: 1.0
  },
  searchBtnText: {
    color: "white",
    fontFamily: "FuturaMedium",
    fontSize: 20
  }
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
