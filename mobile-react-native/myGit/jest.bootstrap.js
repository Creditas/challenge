// Jest Bootstrap
jest.mock('react-redux', () => ({
  ...require.requireActual("react-redux"),
  useDispatch: () => {},
  useSelector: () => ({ error: false }),
}));

jest.mock("react-native/Libraries/LayoutAnimation/LayoutAnimation", () => ({
  ...require.requireActual("react-native/Libraries/LayoutAnimation/LayoutAnimation"),
  configureNext: jest.fn(),
}));
