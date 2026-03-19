import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
modalClose: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', 
},

modalContent: {
  flex: 1,
  marginHorizontal: '3%',
  paddingHorizontal: '5%',
  marginTop: '60%',         // small top margin for spacing, not a huge one!
  marginBottom: '2%',      // small bottom margin
  backgroundColor: 'white', // optional, so content is visually distinct
  borderRadius: 10,      // rounded corners look nice on modals
  zIndex: 1,
},
modalFlatlistContiner: {
  paddingBottom: 20,
  flexGrow: 1,
},
  modalTitleText: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
