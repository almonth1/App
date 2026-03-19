import { TAbstractDevice } from './types';
import bleManager from './bleManager';
import { Characteristic, Device } from 'react-native-ble-plx';
import { Dispatch, useState } from 'react';
import { decode } from 'base-64';
import { updateDeviceData } from '../slices/deviceSlice';
import { AppDispatch } from './store';

const BATTERY_CHAR_UUID      = "b23cca98-2545-4842-a5af-0fc3550aadb1";
const GPS_LAT_CHAR_UUID      = "b23cca98-2545-4842-a5af-0fc3550aadb2";
const GPS_LON_CHAR_UUID      = "b23cca98-2545-4842-a5af-0fc3550aadb3";
const GPS_TIME_CHAR_UUID     = "b23cca98-2545-4842-a5af-0fc3550aadb4";
const GPS_DATE_CHAR_UUID     = "b23cca98-2545-4842-a5af-0fc3550aadb5";
const ANLG_CH0_UUID          = "b23cca98-2545-4842-a5af-0fc3550aadb6";
const ANLG_CH1_UUID          = "b23cca98-2545-4842-a5af-0fc3550aadb7";

//Not yet handled by odk
const Sensor_NAME0_UUID      = "b23cca98-2545-4842-a5af-0fc3550aadb8"; // Assuming this is the UUID for Sensor name
const Sensor_NAME1_UUID      = "b23cca98-2545-4842-a5af-0fc3550aadb9"; // Assuming this is the UUID for Sensor name
const UPDATE_Rate_UUID       = "b23cca98-2545-4842-a5af-0fc3550aadba"; // Assuming this is the UUID for update rate
const readCharacteristic = async (device: Device, characteristics: Characteristic[], dispatch: AppDispatch) => {
  if (!device) {
    console.error('Cannot read: device is undefined');
    return;
  }
  
  try {
  dispatch(updateDeviceData({name: device.name ?? 'Unknown'})); // Update device ID in the state
  for (const char of characteristics) {
    try {
    const readChar = await bleManager.readCharacteristicForDevice(
      device.id,
      char.serviceUUID,
      char.uuid
    );

    const valueBase64 = readChar.value;
    const decodedValue = valueBase64 ? decode(valueBase64) : '';
  
    switch (char.uuid) {
      case BATTERY_CHAR_UUID:
        dispatch(updateDeviceData({battery: decodedValue}));
        break;
      case GPS_LAT_CHAR_UUID:
        dispatch(updateDeviceData({gpsLat: decodedValue}));
        break;
      case GPS_LON_CHAR_UUID:
        dispatch(updateDeviceData({gpsLon: decodedValue}));
        break;
      case GPS_TIME_CHAR_UUID:
        dispatch(updateDeviceData({gpsTime: decodedValue}));
        break;
      case GPS_DATE_CHAR_UUID:
        dispatch(updateDeviceData({gpsDate: decodedValue}));
        break;
      case ANLG_CH0_UUID:
        dispatch(updateDeviceData({ analogCh0: Number(decodedValue) }));
        break;
      case ANLG_CH1_UUID:
        dispatch(updateDeviceData({ analogCh0: Number(decodedValue) }));
        break;
      case Sensor_NAME0_UUID:
        dispatch(updateDeviceData({sensorName0: decodedValue}));
        break;
      case Sensor_NAME1_UUID:
        dispatch(updateDeviceData({sensorName1: decodedValue}));
        break;
      case UPDATE_Rate_UUID:
        dispatch(updateDeviceData({updateRate: Number(decodedValue)}));
        break;
      default:
        console.warn(`Unhandled characteristic UUID: ${char.uuid}`);
    }
  } catch (err) {
    console.error(`Failed to read characteristic ${char.uuid}:`, err);
  }
  }
} catch (error) {
    console.error('Failed to read from device:', error);
    throw error; // Important: re-throw so caller can catch it
  }
};

export default readCharacteristic;
