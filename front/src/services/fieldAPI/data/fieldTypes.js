import * as icons from './icons';

const FIELD_TYPE_COMPANY = 1;
const FIELD_TYPE_BANK = 2;
const FIELD_TYPE_CASINO = 3;
const FIELD_TYPE_JAIL = 4;

const field = (fieldType, title, icon, teleport = null, data = {}) => ({
  fieldType,
  icon,
  teleport,
  title,
  ...data,
});

export const bank = (payment, teleport = null) => field(
  FIELD_TYPE_BANK,
  'Банк',
  icons.ICON_BANK,
  teleport,
  {
    payment,
  },
);

export const casino = (teleport = null) => field(
  FIELD_TYPE_CASINO,
  'Рулѣтка',
  icons.ICON_CASINO,
  teleport,
  {},
);

export const company = (title, cost, icon, teleport = null) => field(
  FIELD_TYPE_COMPANY,
  title,
  icon,
  teleport,
  {
    cost,
  },
);

export const jail = (fine, teleport = null) => field(
  FIELD_TYPE_JAIL,
  'Околотокъ',
  icons.ICON_JAIL,
  teleport,
  {
    fine,
  },
);
