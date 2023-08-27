import { ChangeEvent } from 'react';

// Handling input change events and updating data
const inputHelper = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  data: any
) => {
  const tempData: any = { ...data };

  if (e.target.type === 'checkbox') {
    const target = e.target as HTMLInputElement;
    tempData[target.name] = target.checked;
  } else {
    const target = e.target as HTMLInputElement;
    tempData[target.name] = target.value;
  }

  // Convert "on" value to true, and leave other values unchanged
  if (tempData.saveAddress === 'on') {
    tempData.saveAddress = true;
  }

  return tempData;
};

export default inputHelper;
