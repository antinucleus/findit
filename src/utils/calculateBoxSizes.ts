import {Dimensions} from 'react-native';

let MARGIN = 5;
const MAX_SIZE = 60;

export const calculateBoxSizes = (columnCount: number, margin?: number) => {
  if (margin) {
    MARGIN = margin;
  }

  const {width} = Dimensions.get('window');

  const size = Math.floor((width - 2 * columnCount * MARGIN) / columnCount);
  return size > MAX_SIZE ? MAX_SIZE : size;
};
