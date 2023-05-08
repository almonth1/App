import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF1FF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  body: {
    width: '100%',
    height: '100%',
    gap: 10,
    paddingTop: 70,
  },
  titleContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    shadowColor: '#000',
  },
  safe: {
    color: '#6095ff',
  },
  notSafe: {
    color: '#d95448',
  },
  buttonPanel: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    paddingTop: 15,
    paddingHorizontal: 15,
    marginHorizontal: '5%',
    marginBottom: 20,
  },
  buttonContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  barChartContainer: {
    width: '90%',
    marginBottom: 20,
    marginHorizontal: '5%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  pieChartContainer: {
    width: '90%',
    marginHorizontal: '5%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dataContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  dataTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#d95448',
    shadowColor: '#000',
    width: '100%',
  },
  data: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    width: '100%',
  },
});