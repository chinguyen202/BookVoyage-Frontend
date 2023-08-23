import { ChangeEvent } from 'react';

// Handling input change events and updating data
const inputHelper = (e: ChangeEvent<HTMLInputElement>, data: any) => {
  const tempData: any = { ...data };
  tempData[e.target.name] = e.target.value;
  return tempData;
};

export default inputHelper;
