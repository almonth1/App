import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DeviceData = {
  name: string;
  battery: string;
  gpsLat: string;
  gpsLon: string;
  gpsTime: string;
  gpsDate: string;
  analogCh0: number;
  analogCh1: number;
  sensorName0: string; // Assuming Sensor is a string, adjust type as necessary
  sensorName1: string; // Assuming Sensor is a string, adjust type as necessary
  updateRate: number; // Assuming updateRate is a number, adjust type as necessary
};

const initialState: DeviceData = {
  name: '',
  battery: '',
  gpsLat: '',
  gpsLon: '',
  gpsTime: '',
  gpsDate: '',
  analogCh0: 0,
  analogCh1: 0,
  sensorName0: 'Undefined Sensor', // Default value, adjust as necessary
  sensorName1: 'Undefined Sensor', // Default value, adjust as necessary
  updateRate: 2000, // Default value in ms, adjust as necessary
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    updateDeviceData(state, action: PayloadAction<Partial<DeviceData>>) {
      return { ...state, ...action.payload };
    },
    resetDeviceData() {
      return initialState;
    },
  },
});

export const { updateDeviceData, resetDeviceData } = deviceSlice.actions;
export default deviceSlice.reducer;
