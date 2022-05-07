export default function useTheme(mode, themeColor) {
  if (mode === 'light') {
    return themeColor.light
  } else if (mode === 'dark') {
    return themeColor.dark
  }
}
