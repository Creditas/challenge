import { LayoutAnimation } from 'react-native';

export const configureLayoutAnimation = () =>
  LayoutAnimation.configureNext({
    duration: 300,
    create: {
      delay: 300,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  });
