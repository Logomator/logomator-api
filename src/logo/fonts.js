const FONT_LIST = [
  'Montserrat',
  'Montserrat Semibold',
  'Montserrat Bold',
  'Abril Fat Face',
  'Alex Brush',
  'Bebas Neue',
  'Boogaloo',
  'Caviar Dreams',
  'Caviar Dreams Bold',
  'Chunk Five',
  'Cinzel',
  'Cinzel Bold',
  'Dancing Script',
  'Great Vibes',
  'Happy Monkey',
  'Lato',
  'Lato Semi Bold',
  'Lato Bold',
  'Lato Medium',
  'Oswald',
  'Pacifico',
];

const TAGLINE_FONT_LIST = [
  'Lato',
  'Montserrat',
];

const FONT_CASING = [
  'lowercase',
  'uppercase',
  'pascalCase',
];


class Fonts {
  static getFonts() {
    return FONT_LIST;
  }

  static getTaglineFonts() {
    return TAGLINE_FONT_LIST;
  }

  static getFontCasing() {
    return FONT_CASING;
  }
}

module.exports = Fonts;
