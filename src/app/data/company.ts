export interface NavLink {
  id: string;
  label: string;
}

export const PHONE = '+91 98486 14111';
export const PHONE_LINK = '+919848614111';
export const WHATSAPP_NUMBER = '919848614111';
export const EMAIL = 'sales@kurrainfra.com';
export const ADDRESS =
  'Kurra Infra, Aydiv Ventures, 11th Floor, Myscape Road, Financial District, Nanakramguda, Hyderabad, Telangana 500032';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
