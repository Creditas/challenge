import { Platform } from 'react-native';
import Colors from './Colors';
import Layout from './Layout';

const Buttons = {
  primary: {
    backgroundColor: Colors.white,
    color: Colors.primary,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    borderRadius: Layout.Global.radius,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
};

export default Buttons;
