import { StyleSheet } from 'react-native';

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
    paddingTop: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    width: '100%',
    height: 50,
    textAlign: 'left',
    marginVertical: 10,
    paddingHorizontal: '5%',
  },
  subtitleContainer: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginHorizontal: '5%',
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    shadowColor: '#000',
  },
  content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  paragraphsContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginHorizontal: '5%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    width: '100%',
    textAlign: 'left',
    paddingTop: 10,
  },
});