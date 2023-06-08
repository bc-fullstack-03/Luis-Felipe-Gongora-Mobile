import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  containerComments: {
    marginStart: 12,
    marginEnd: 12,
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: THEME.COLORS.BORDER,
  },
  comments: { flexDirection: 'row', alignItems: 'center' },
  commentsName: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.TEXT,
    marginStart: 6,
  },
  containerDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentsDescription: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.TEXT,
    marginStart: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  number: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.TEXT,
    marginStart: 4,
    marginEnd: 24,
  },
});
