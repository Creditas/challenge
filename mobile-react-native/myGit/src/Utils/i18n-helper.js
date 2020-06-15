import { NativeModules } from 'react-native';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;


export const getDeviceLanguage = () =>
  String(deviceLanguage).replace('-', '_').split('_')[0];
