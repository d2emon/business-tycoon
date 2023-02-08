import { ICON_BANK, ICON_CASINO, ICON_JAIL } from "./icons";

const FIELD_TYPE_COMPANY = 1;
const FIELD_TYPE_BANK = 2;
const FIELD_TYPE_CASINO = 3;
const FIELD_TYPE_JAIL = 4;

export const newField = (fieldType, title, icon, teleport=null, data={}) => ({
  fieldType,
  icon,
  teleport,
  title,
  ...data,
});

export const newBank = (payment, teleport=null) => newField(
  FIELD_TYPE_BANK,
  'Банк',
  ICON_BANK,
  teleport,
  {
    payment,
  },
);

export const newCompany = (title, cost, icon, teleport=null) => newField(
  FIELD_TYPE_COMPANY,
  title,
  icon,
  teleport,
  {
    cost,
  },
);

export const newCasino = (teleport=null) => newField(
  FIELD_TYPE_CASINO,
  'Рулѣтка',
  ICON_CASINO,
  teleport,
  {},
);

export const newJail = (fine, teleport=null) => newField(
  FIELD_TYPE_JAIL,
  'Околотокъ',
  ICON_JAIL,
  teleport,
  {
    fine,
  },
);
    