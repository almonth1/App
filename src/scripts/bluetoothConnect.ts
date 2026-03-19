import { TAbstractDevice } from './types';
import bleManager from './bleManager';
import { decode } from 'base-64';
import { Characteristic, Device, Service } from 'react-native-ble-plx';

const ODK_SERVICE_UUID = "b23cca98-2545-4842-a5af-0fc3550aadb0"


const connectToDevice = async (
  device: TAbstractDevice, 
  setCharacteristics: (chars: Characteristic[] | null) => void,
  setConnectedDevice: (device: Device | null) => void,) => {
  let odk_service: Service | null = null;
  let odk_characteristics: Characteristic[] | null = null;
  try {
    const connectedDevice = await bleManager.connectToDevice(device.id);
    if (!connectedDevice) {
      console.error('Failed to connect: Device is undefined');
      return;
    }
    console.log('Connected to device', connectedDevice.name);
    await connectedDevice.discoverAllServicesAndCharacteristics();
    setConnectedDevice(connectedDevice);
    
    // Get all services
    const services = await connectedDevice.services();
    odk_service = services.find(s => s.uuid === ODK_SERVICE_UUID) ?? null;

    if (!odk_service) {
      console.error('ODK service not found');
      setCharacteristics(null);
      return;
    } 

        // Get characteristics for the odk service UUID and update the state
      odk_characteristics = await connectedDevice.characteristicsForService(odk_service.uuid);
      setCharacteristics(odk_characteristics);
      
      for (const char of odk_characteristics) {
          try {
          const readChar = await bleManager.readCharacteristicForDevice(
            device.id,
            char.serviceUUID,
            char.uuid
          );
          const valueBase64 = readChar.value;
          const decodedValue = valueBase64 ? decode(valueBase64) : '';
        } catch (err) {
          console.error(`Failed to read characteristic ${char.uuid}:`, err);
        }
      }

   } catch (error) {
    console.error('Failed to connect to device:', error);
    setCharacteristics(null);
  }

};

export default connectToDevice;
