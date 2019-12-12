import theme from '../../src/components/theme';

describe('theme', () => {
  describe('constants', () => {
    it('should return colors ', () => {
      const colors = theme.colors;
      expect(colors).toMatchSnapshot();
    });
    it('should return spacing ', () => {
      const spacing = theme.spacing;
      expect(spacing).toMatchSnapshot();
    });
  });

  describe('getColor', () => {
    it('should return color ', () => {
      const color = theme.getColorFromProps({secondary: true});
      expect(color).toMatch(theme.colors.secondary);
    });
    it('should return default color ', () => {
      const color = theme.getColorFromProps({});
      expect(color).toMatch(theme.colors.primary);
    });
  });
});
