import { NativeModules } from 'react-native';
import Reactotron, { openInEditor } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const tron = Reactotron.configure({ host: hostname })
  .useReactNative()
  .use(reactotronRedux())
  .use(openInEditor())
  .connect();

tron.clear();

console.tron = Reactotron;

export default tron;
