import {
  bank,
  casino,
  company,
  jail,
} from './fieldTypes';
import * as icons from './icons';

export const collectionId = 'fields';

const data = [
  // 1-11
  bank(1000),
  company('Руссо-Балтъ', 9000, icons.ICON_AUTO),
  company('Ньюпортъ', 20000, icons.ICON_AVIATION),
  company('Доходный Домъ', 9000, icons.ICON_HOTEL, 20),
  casino(),
  company('Гарфункѣль', 10000, icons.ICON_MUSIC),
  company('Елѣсѣѣвъ', 2000, icons.ICON_FOOD),
  company('Філіповъ', 1500, icons.ICON_FOOD),
  company('Табакъ', 1000, icons.ICON_SMOKING),
  company('Трактіръ', 5000, icons.ICON_FOOD),
  company('Квасъ', 7000, icons.ICON_FOOD),

  jail(10000),

  // 13-23
  company('Зінгѣръ', 3000, icons.ICON_FASHION),
  company('Сбітѣнь', 7000, icons.ICON_FOOD),
  company('Извозъ', 2000, icons.ICON_AUTO),
  company('Лѣпажъ', 12000, icons.ICON_GUN),
  company('Братія Райтъ', 20000, icons.ICON_AVIATION),
  bank(2000),
  company('Махорка', 5000, icons.ICON_SMOKING),
  company('Фордъ', 8000, icons.ICON_AUTO, 4),
  company('Голандъ і Голандъ', 2000, icons.ICON_GUN, 27),
  casino(),
  company('Бобровъ і Ко', 2000, icons.ICON_SAIL),

  jail(8000),

  // 25-35
  company('Крупъ', 5000, icons.ICON_GUN),
  company('Савоі', 15000, icons.ICON_HOTEL, 45),
  company('Остінъ', 10000, icons.ICON_AUTO, 21),
  company('Сытінъ', 3000, icons.ICON_FOOD),
  bank(2000),
  company('Фіатъ', 20000, icons.ICON_AUTO),
  casino(),
  company('Мѣха', 7000, icons.ICON_FASHION),
  company('Ціркъ', 7000, icons.ICON_MUSIC),
  company('Зауэръ', 2000, icons.ICON_GUN),
  company('Медъ', 7000, icons.ICON_FOOD),

  jail(9000),

  // 37-46
  company('Асторія', 2000, icons.ICON_HOTEL),
  bank(2000),
  company('Яхта', 3000, icons.ICON_SAIL),
  company('Кофій', 4000, icons.ICON_FOOD),
  company('Дагѣръ', 9000, icons.ICON_MUSIC),
  company('Салонъ', 8000, icons.ICON_MUSIC),
  company('Кольтъ', 3000, icons.ICON_GUN),
  company('Данхілъ', 5000, icons.ICON_SMOKING),
  company('Бѣнтли', 10000, icons.ICON_AUTO),
  company('Чай', 7000, icons.ICON_FOOD, 26),
  company('Тула', 4000, icons.ICON_GUN),
].map((values, id) => ({
  position: id,
  ...values,
}));

export default data;
