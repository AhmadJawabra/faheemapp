import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// Importing components
import FindTutor from "../components/findTutor/find-tutor";
import SearchResult from "../components/searchResult/search-result";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: FindTutor
    },
    SearchResult: SearchResult
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
