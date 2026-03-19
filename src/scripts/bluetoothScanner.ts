import React, { useEffect, useState } from 'react';
import { Device, BleManager } from 'react-native-ble-plx';
import { TAbstractDevice } from './types';
import bleManager from './bleManager';
import readCharacteristic from './bleRead';

const BluetoothScanner = ({
  devices,
  isModalVisible,
  setDevices,
}: {
  devices: TAbstractDevice[];
  isModalVisible: boolean;
  setDevices: React.Dispatch<React.SetStateAction<TAbstractDevice[]>>;
}) => {
    const [btReady, setBtReady] = useState(false);
    const [connectedDevice, setConnectedDevice] = useState<TAbstractDevice | null>(null);
  
    useEffect(() => {
      // Check if Bluetooth is powered on when the component mounts
      const subscription = bleManager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          console.log('Bluetooth is powered on');
          setBtReady(true);
          subscription.remove(); // stop listening after powered on
        }
      }, true);
      // Cleanup function to remove the subscription when the component unmounts
      return () => subscription.remove();
    }, []);

    useEffect(() => {
    // If Bluetooth is not ready or the modal is not visible, do not start scanning
    if (!btReady || !isModalVisible) return;

    console.log('Starting BLE scan...');
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error('Scan error:', error.message);
        return;
      }
      // Check if the scanned device is valid and has a name
      if (scannedDevice && scannedDevice.name) {
        // Log the scanned device details into an array if it is not already present
        setDevices((prev) => {
          const exists = prev.find((d) => d.id === scannedDevice.id);
          const scannedAbstractDevice: TAbstractDevice = {
            name: scannedDevice.name || 'Unknown Device',
            id: scannedDevice.id,
            serviceUUIDs: scannedDevice.serviceUUIDs || [],
          };
          return exists ? prev : [...prev, scannedAbstractDevice];
        });
      }
    });
    // Cleanup function to stop scanning when the component unmounts or when the modal is closed
    return () => {
      console.log('Stopping BLE scan...');
      bleManager.stopDeviceScan();
    };
  }, [btReady, isModalVisible]);


    return null
    // render devices list...
  };

  

export default BluetoothScanner;
