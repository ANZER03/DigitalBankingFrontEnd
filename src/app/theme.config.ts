import {definePreset, palette} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: palette('{indigo}')
    //   {
    //   50: '{blue.50}',
    //   100: '{blue.100}',
    //   200: '{blue.200}',
    //   300: '{blue.300}',
    //   400: '{blue.400}',
    //   500: '{blue.500}',
    //   600: '{blue.600}',
    //   700: '{blue.700}',
    //   800: '{blue.800}',
    //   900: '{blue.900}',
    //   950: '{blue.950}'
    // }
    ,
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      }
    }
  }
});

export default MyPreset;
