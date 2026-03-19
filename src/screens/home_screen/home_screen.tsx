import React, {ReactElement, useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../../scripts/screen_params';

import {styles} from './home_styles';
import {styles as globalStyles} from '../../../App_styles';

import HomeSvg from '../../svgs/home.svg';
import Button from '../../components/button/button';
import DeviceModal from '../../components/modal/modal';

import {ColorContext} from '../../context/color_context';

import {useAppDispatch, useAppSelector} from '../../scripts/redux_hooks';
import {
  selectContainerContrast,
  selectPageContrast,
  selectTextContrast,
} from '../../slices/colorSlice';
import {
  clearReceivedData,
  initiateConnection,
  initiateDisconntect,
  requestPermissions,
  scanForDevices,
  selectAvailableDevices,
  selectConnectedDevice,
} from '../../slices/bluetoothSlice';
import bluetoothManager from '../../scripts/bluetoothManager(outdated)';
import {TAbstractDevice} from '../../scripts/types';
import { Characteristic, Device, Subscription} from 'react-native-ble-plx';
import BluetoothScanner from '../../scripts/bluetoothScanner';
import connectToDevice from '../../scripts/bluetoothConnect';
import readCharacteristic from '../../scripts/bleRead';
import bleManager from '../../scripts/bleManager';


///To Do:
// 2. Connect/map devicedata to reading type


type Props = NativeStackScreenProps<HomeParamList, 'HomeScreen'>;


  //example devices for testing purposes without physical android/ios device
const exampleDevice: TAbstractDevice = {
  name: 'My Bluetooth Device',
  id: 'device-123',
  serviceUUIDs: ['1234abcd-0000-1000-8000-00805f9b34fb', '5678efgh-0000-1000-8000-00805f9b34fb'],
};
const exampleDevice2: TAbstractDevice = {
  name: 'My Bluetooth Device',
  id: 'device-1234',
  serviceUUIDs: ['1234abcd-0000-1000-8000-00805f9b34fb', '5678efgh-0000-1000-8000-00805f9b34fb'],
};

export default function HomeScreen({navigation}: Props): ReactElement<Props> {
  const [isModalVisible, setModalVisible] = React.useState(false);
  // Get the contrast settings from the redux store
  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const availableDevices = useAppSelector(selectAvailableDevices);
  const deviceData = useAppSelector(state=> state.device);
  const dispatch = useAppDispatch();

  const {color, lightColor} = useContext(ColorContext);

  const closeModal = () => {
    setModalVisible(false);
  };
  
const [devices, setDevices] = useState<TAbstractDevice[]>([]);
const [scanStarted, setScanStarted] = useState(false);
const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
const [characteristics, setCharacteristics] = useState<Characteristic[] | null>(null);
const [readyToRead, setReadyToRead] = useState(false);



const [disconnectionSubscription, setDisconnectionSubscription] = useState<Subscription | null>(null);
const deviceNames = devices.map(device => device.name);

// command to start reading data from the device
const [BeginRead, setBeginRead] = useState<boolean>(true);

// polling interval for reading data from the device
const readInterval = 2000; // 2 seconds

const handleStartScan = () => {
  setScanStarted(true); // triggers rendering of BluetoothScanner
};

//passes connectToDevice with SetIsConnected to update connection status
const wrappedConnectToDevice = async (device: TAbstractDevice) => {
 connectToDevice(device, setCharacteristics, setConnectedDevice);
  };



// Cleanup on unmount or when disconnecting manually:
useEffect(() => {
  return () => {
    disconnectionSubscription?.remove();
  };
}, [disconnectionSubscription]);

// disconnects from the connected device, resets the connectedDevice state, and removes the disconnection subscription
const disconnectFromDevice = async () => {
  if (connectedDevice) {
    await bleManager.cancelDeviceConnection(connectedDevice.id);
    console.log('Disconnected from device:', connectedDevice.name);
    setConnectedDevice(null);
    setCharacteristics(null);
  }
};

// reads data from the connected device aftere checking connection status, and characteristics are available
// Set readiness state
useEffect(() => {
  setReadyToRead(!!connectedDevice && !!characteristics && BeginRead);
}, [connectedDevice, characteristics, BeginRead]);

// Handle polling
useEffect(() => {
  if (!readyToRead) return;

  let intervalId = setInterval(async () => {
    try {
      if (connectedDevice && characteristics) {
        await readCharacteristic(connectedDevice, characteristics, dispatch);
      }
    } catch (err) {
      console.error('Polling read error:', err);
      if (connectedDevice?.id) {
        await bleManager.cancelDeviceConnection(connectedDevice.id);
      }
      clearInterval(intervalId);
    }
  }, readInterval);

  return () => clearInterval(intervalId);
}, [readyToRead]);

  return (
    <View style={globalStyles.screen}>
      <View style={[globalStyles.page, styles.pageContainer, pageContrast]}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color}]}>Biodevices</Text>
          <Text style={[styles.headerPlain, textContrast]}>Without</Text>
          <Text style={[styles.headerText, {color}]}>Borders</Text>
        </View>
        <View style={styles.svgContainer}>
          <HomeSvg
            height="100%"
            width="100%"
            color={lightColor}
            style={styles.svg}
          />
        </View>
        {connectedDevice ? (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  dispatch(clearReceivedData());
                  navigation.navigate('LoadingScreen', {validNavigation: true});
                }}>
                <Text style={styles.buttonText}>Take Readings</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={disconnectFromDevice}>
                <Text style={styles.buttonText}>Disconnect</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  dispatch(requestPermissions());
                  handleStartScan();
                  setModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Connect</Text>
              </Button>
              {scanStarted && (
                <BluetoothScanner devices={devices} setDevices={setDevices} isModalVisible ={isModalVisible}/>
              )}
            </View>
          </View>
        )}
      </View>
      <DeviceModal
        closeModal={closeModal}
        visible={isModalVisible}
        devices={devices}
        connectToDevice={wrappedConnectToDevice}
      />
    </View>
  );
}


