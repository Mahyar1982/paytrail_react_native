import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import PaytrailComponent from './components/PaytrailComponent';

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{flex: 1, marginTop: 5, marginLeft: 5, marginRight: 5}}>
        <PaytrailComponent />
      </SafeAreaView>
    </>
  );
};

export default App;
