import { useEffect, useState } from 'react';
import base64 from 'react-native-base64';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  Subscription,
} from 'react-native-ble-plx';
import { TAbstractDevice } from './types';

const DEVICE_UUID = '0000FFE0-0000-1000-8000-00805F9B34FB';
// const CHARACTERISTIC_UUID = '0000FFE1-0000-1000-8000-00805F9B34FB';
const Service_UUID = '00001801-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = 'b23cca98-2545-4842-a5af-0fc3550aadb1';


class BluetoothManager {
  bleManager: BleManager;
  device: Device | null;
  subscription: Subscription | undefined;

  constructor() {
    this.bleManager = new BleManager();
    this.device = null;
    this.subscription = undefined;
  }
  

 
  scanForDevices = (
    onDeviceFound: (arg: {
      type: string;
      payload: BleError | Device | null;
    }) => void,
  ) => {
    console.log('scanning for devices');
    //not entering this function, issue with the bleManager?
    this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.log('error', error);
        return;
      }
      console.log('scanning...')
      onDeviceFound({type: 'SAMPLE', payload: scannedDevice ?? error});
      return;
    });
    return () => {
      this.bleManager.stopDeviceScan();
    };
  };

  stopScanningForDevices = () => {
    this.bleManager.stopDeviceScan();
  };

  connectToDevice = async (deviceId: string) => {
    try {
      const connectedDevice = await this.bleManager.connectToDevice(deviceId);
      if (connectedDevice) {
        console.log('connected to device', connectedDevice.name);
        await connectedDevice.discoverAllServicesAndCharacteristics();
        this.device = connectedDevice;
      } else {
        console.error('Failed to connect: Device is undefined');
        this.device = null;
      }
    } catch (error) {
      console.error('Failed to connect to device:', error);
      this.device = null;
    }
  };

  readCharacteristic = async () => { 
    try{
    
    if(this.device){
    const readData = await this.bleManager.readCharacteristicForDevice( 
    
    this.device?.id, Service_UUID, CHARACTERISTIC_UUID).then(readData=>{ 
    
    console.log('Data Read from the BLE device:', readData) 
    
    })
  }
  else{
    console.log('Error while reading data from BLE device: device is undefined',)
  }
} catch(error) { 
      console.error('Failed to connect to device:', error);
      this.device = null;
    }
    } 

  disconnectFromDevice = async (deviceId: string) => {
    this.device = await this.bleManager.cancelDeviceConnection(deviceId);
  };

  monitorDisconnection = (
    deviceId: string,
    onDeviceDisconnect: (arg: {type: string; payload: boolean}) => void,
  ) => {
    const unsubscriber = this.bleManager.onDeviceDisconnected(deviceId, () => {
      onDeviceDisconnect({type: 'SAMPLE', payload: true});
      return;
    });
    return () => {
      unsubscriber.remove();
    };
  };

  onReceivedDataUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
    emitter: (arg: {payload: string | BleError}) => void,
  ) => {
    if (error) {
      if (error.errorCode !== 2) {
        console.error(error);
        emitter({payload: error});
      }
    }

    const decodedData: string = base64.decode(characteristic?.value ?? '');
    //remove special characters
    const filteredData: string = decodedData.replace(/(\r\n|\n|\r)/gm, '');
    const lastIndex = filteredData.length - 1;
    if (filteredData[lastIndex] === '?') {
      this.sendData('next');
    }
    console.log(filteredData);

    emitter({payload: filteredData});
  };

  sendData = async (data: string) => {
    console.log(`sending ${data}`);
    await this.device?.writeCharacteristicWithResponseForService(
      DEVICE_UUID,
      CHARACTERISTIC_UUID,
      base64.encode(data),
    );
  };

  startReadingData = async (
    emitter: (arg: {payload: string | BleError}) => void,
  ) => {
    console.log('started reading');
    await this.device?.discoverAllServicesAndCharacteristics();
    await this.sendData('takeReading');
    this.subscription = this.device?.monitorCharacteristicForService(
      DEVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) =>
        this.onReceivedDataUpdate(error, characteristic, emitter),
    );
  };

  stopReadingData = async () => {
     this.subscription?.remove();
  };
}

const bluetoothManager = new BluetoothManager();

export default bluetoothManager;
