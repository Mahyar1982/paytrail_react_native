import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import PaytrailScreen from './pages/PaytrailScreen';

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1, marginTop: 5, marginLeft: 5, marginRight: 5}}>
        <PaytrailScreen />
      </SafeAreaView>
    </>
  );
};

export default App;
