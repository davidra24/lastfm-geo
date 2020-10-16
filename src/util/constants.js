const LAST_API_KEY = '829751643419a7128b7ada50de590067';
export const API_PATH = `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&api_key=${LAST_API_KEY}&format=json`;
export const API_PATH_2 = `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&api_key=${LAST_API_KEY}&format=json`;
export const API_IMAGE = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LAST_API_KEY}&format=json`;
export const API_COUNTRY = '&country='
export const API_ARTIST = '&artist='
export const API_TRACK = '&track='
export const API_PAGE = '&page='

export const PRIMARY_COLOR = '#F55557'
export const SECONDARY_COLOR = '#327CA8'

export const DEFAULT_IMAGE = 'data:image/png;base64,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hJJwZs8Ok89eC4/vuc/rfD5L13Xy/v7+1IUQ7sf8GGF5MAzDU45Fce8EJKwe8+yerXEcoz6HfkkILA/GcXyoA9sdGezeKkNYPc5t66mq6nok9L0ul0sU53SlgMDy5Hw+3zXH0XWdFEUR7UsZlsC9dOOeHxVrLffGIwLLA2OMdF13cz9QXdcPvRYeP+N6toqiuPmcraqqKNE9YtLdE2PMdbvM29vblw943/dSVRW9VR5Nz9nquk52u92XE/KunHT3FH4QWJ7VdS1d18nr6+u14dDNp4zjKOfzWdq2pV0hENez1fe9bLdbeX19lSzLrvfIWitd111XGrlHfplfv37RPOKZm8uaboi21krf90yqR8TdizzPr4E1XfHlPvnHCCsA96Bba/94kQHlX1zcvZhOxnOPwiKwAuPhjx/3KB6sEgJQg8ACoAaBBUANAguAGgQWADUILABqEFgA1CCwAKhBYAFQg8ACoAaBBUANAguAGgQWADUILABqEFgA1CCwAKhBYAFQg8ACoAaBBUANAguAGgQWADUILABqEFgA1CCwAKhBYAFQg8ACoAaBBUANAguAGgQWADUILABqEFgA1CCwAKhBYAFQg8ACoAaBBUANAguAGgQWADUILABqEFgA1CCwAKhBYAFQg8ACoAaBBUANAguAGgQWADUILABqEFgA1CCwAKhBYAFQg8ACoAaBBUANAguAGgQWADUILABqEFgA1CCwAKhBYAFQg8ACoAaBBUANAguAGgQWADUILABq/A/XjADY9fy/1wAAAABJRU5ErkJggg=='