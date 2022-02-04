// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
import React from 'react';

import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {CacheMessage} from 'holoplay-core';
import RNFetchBlob from 'rn-fetch-blob'
// import {NativeModules} from 'react-native';
export default function App() {
  // refers to https://eka.hn/quilt/?q=https://i.imgur.com/mp0pD3I.jpeg&vx=5&vy=9
  var curQuiltOptions = {
    q: 'https://i.imgur.com/mp0pD3I.jpeg',
    vx: 5,
    vy: 9,
    vt: null,
    a: null,
    ov: null};
  function downloadFromURL(url, responseType, callback) {
    console.log("downloadFromURL");

    // send http request in a new thread (using native code)
    // const RNFetchBlob = NativeModules.RNFetchBlob;
    RNFetchBlob.fetch('GET', url)
    .then((res) => {
      let status = res.info().status;

      if(status == 200) {
        // the conversion is done in native code
        // let base64Str = res.base64()
        // the following conversions are done in js, it's SYNC
        callback(res)
      } else {
        // handle other status codes
      }
    })
    // Something went wrong:
    .catch((errorMessage, statusCode) => {
      // error handling
    })
    // console.log("downloadFromURL");
    // var xhttp = new XMLHttpRequest();
    // console.log("downloadFromURL 0");
    // console.log(responseType)
    // // xhttp.responseType = responseType;
    
    // xhttp.responseType = 'arraybuffer';
    
    // // Process the response when the request is ready.
    // xhttp.onload = function(e) {
    //   console.log("downloadFromURL 1");
    //   if (this.status == 200) {
    //     // Create a binary string from the returned data, then encode it as a data URL.
    //     var uInt8Array = new Uint8Array(this.response);
    //     var i = uInt8Array.length;
    //     var binaryString = new Array(i);
    //     while (i--)
    //     {
    //       binaryString[i] = String.fromCharCode(uInt8Array[i]);
    //     }
    //     callback("data:image/png;base64," + base64);


    //     // document.getElementById("myImage").src="data:image/png;base64," + base64;
    //   }
    // };

    // xhttp.send();

    // xhttp.onreadystatechange = function () {
    //   console.log("function");

    //   if (this.readyState == 4) {
    //     console.log(this.status);

    //     if (this.status == 200) {
          
    //       callback(this.response);
    //     } else {
    //       console.log(this.status);
    //     }
    //   } else {
    //     console.log(this.readyState);
    //   }
    // };
    xhttp.open("GET", url, true);
    xhttp.send();
    console.log("downloadFromURL2");
  }
  function imageLoaded(img) {
    console.log("imageLoaded");
    // img is a blob
    if (img == null) return;
    var myReader = new FileReader();
    myReader.onload = function (e) {
      arrayBufferDone(e.target.result);
    };
    myReader.readAsArrayBuffer(img);
  }
  function arrayBufferDone(buf) {
    console.log("arrayBufferDone");
    let s = {};
    if (curQuiltOptions.vx != null) s.vx = curQuiltOptions.vx;
    if (curQuiltOptions.vy != null) s.vy = curQuiltOptions.vy;
    if (curQuiltOptions.vt != null) s.vtotal = curQuiltOptions.vt;
    if (curQuiltOptions.a != null) s.aspect = curQuiltOptions.a;
    if (curQuiltOptions.ov != null) s.overscan = curQuiltOptions.ov;
    let showCmd = new CacheMessage("quilt1", s, new Uint8Array(buf), true);
    client.sendMessage(showCmd).then(
      function () {
        console.log("Quilt displayed");
      }).catch(function (err) {
        console.log(err);
      }
      );
  }
  const HoloPlayCore = require('holoplay-core');
  const client = new HoloPlayCore.Client(
    (msg) => {
      console.log('Calibration values:', msg);
      downloadFromURL(curQuiltOptions.q, "blob", imageLoaded);
    },
    (err) => {
      console.error('Error creating HoloPlay client:', err);
    });


  return (
    <View style={styles.container}>
      <Text>Enjoy avocado hologram in Looking Glass</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
