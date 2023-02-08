import { enumerate, makeIndices } from "../../utils";
import { newBank, newCasino, newCompany, newJail } from "./fieldTypes";
import * as icons from "./icons";

const FIELDS = makeIndices(enumerate([
  // 1-11
  newBank(1000),
  newCompany('Руссо-Балтъ', 9000, icons.ICON_AUTO),
  newCompany('Ньюпортъ', 20000, icons.ICON_AVIATION),
  newCompany('Доходный Домъ', 9000, icons.ICON_HOTEL, 20),
  newCasino(),
  newCompany('Гарфункѣль', 10000, icons.ICON_MUSIC),
  newCompany('Елѣсѣѣвъ', 2000, icons.ICON_FOOD),
  newCompany('Філіповъ', 1500, icons.ICON_FOOD),
  newCompany('Табакъ', 1000, icons.ICON_SMOKING),
  newCompany('Трактіръ', 5000, icons.ICON_FOOD),
  newCompany('Квасъ', 7000, icons.ICON_FOOD),

  newJail(10000),

  // 13-23
  newCompany('Зінгѣръ', 3000, icons.ICON_FASHION),
  newCompany('Сбітѣнь', 7000, icons.ICON_FOOD),
  newCompany('Извозъ', 2000, icons.ICON_AUTO),
  newCompany('Лѣпажъ', 12000, icons.ICON_GUN),
  newCompany('Братія Райтъ', 20000, icons.ICON_AVIATION),
  newBank(2000),
  newCompany('Махорка', 5000, icons.ICON_SMOKING),
  newCompany('Фордъ', 8000, icons.ICON_AUTO, 4),
  newCompany('Голандъ і Голандъ', 2000, icons.ICON_GUN, 27),
  newCasino(),
  newCompany('Бобровъ і Ко', 2000, icons.ICON_SAIL),

  newJail(8000),

  // 25-35
  newCompany('Крупъ', 5000, icons.ICON_GUN),
  newCompany('Савоі', 15000, icons.ICON_HOTEL, 45),
  newCompany('Остінъ', 10000, icons.ICON_AUTO, 21),
  newCompany('Сытінъ', 3000, icons.ICON_FOOD),
  newBank(2000),
  newCompany('Фіатъ', 20000, icons.ICON_AUTO),
  newCasino(),
  newCompany('Мѣха', 7000, icons.ICON_FASHION),
  newCompany('Ціркъ', 7000, icons.ICON_MUSIC),
  newCompany('Зауэръ', 2000, icons.ICON_GUN),
  newCompany('Медъ', 7000, icons.ICON_FOOD),

  newJail(9000),

  // 37-46
  newCompany('Асторія', 2000, icons.ICON_HOTEL),
  newBank(2000),
  newCompany('Яхта', 3000, icons.ICON_SAIL),
  newCompany('Кофій', 4000, icons.ICON_FOOD),
  newCompany('Дагѣръ', 9000, icons.ICON_MUSIC),
  newCompany('Салонъ', 8000, icons.ICON_MUSIC),
  newCompany('Кольтъ', 3000, icons.ICON_GUN),
  newCompany('Данхілъ', 5000, icons.ICON_SMOKING),
  newCompany('Бѣнтли', 10000, icons.ICON_AUTO),
  newCompany('Чай', 7000, icons.ICON_FOOD, 26),
  newCompany('Тула', 4000, icons.ICON_GUN),
]));

export default FIELDS;
