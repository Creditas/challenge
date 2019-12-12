const colors = {
  primary: '#3099DD',
  secondary: '#FFC82B',
  error: '#FF612B',
  success: '#26E288',
  light: '#fff',
  dark: '#333',
  grey: '#e2e2e2',
};

const spacing = {
  padding: 12,
  margin: 12,
};

const getColorFromProps = props => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i++) {
    if (colors[keys[i]]) {
      return colors[keys[i]];
    }
  }
  return colors.primary;
};

const theme = {
  colors,
  spacing,
  getColorFromProps,
};

export default theme;
