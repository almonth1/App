import {StyleSheet} from 'react-native';
import { buffers } from 'redux-saga';

export const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '20%',
    width: '100%',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    shadowColor: '#000',
  },
  headerPlain: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '45%',
    width: '100%',
  },
  svg: {
    height: '100%',
    width: '100%',
  },
buttonPanel: {
  alignItems: 'center',
  justifyContent: 'center', // change from 'space-evenly'
  boxSizing: 'border-box',
  // height: '25%', // ← REMOVE THIS
  width: '100%',
  paddingHorizontal: 15,
  paddingVertical: 20,
  backgroundColor: '#fff',
},

buttonContainer: {
  minHeight: 60,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 100,
  paddingVertical: 0,
  marginVertical: 4, // small spacing between buttons
},
  active: {
    backgroundColor: '#d95448',
  },
  inactive: {
    backgroundColor: '#f2b3b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
});
