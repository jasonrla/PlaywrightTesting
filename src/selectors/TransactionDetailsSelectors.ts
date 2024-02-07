import { LanguageKey } from '../utils/utils';

export const langSelector = '#menu-button-8'; 
export const engOption = '#menu-list-8-menuitem-5 > div:nth-child(1)';
export const spaOption = '#menu-list-8-menuitem-6 > div:nth-child(1)';

export const transactionDetails: Record<string, Record<LanguageKey, string>> = {
    SuccessNotification: {
        "english": "Your receipt has been attached successfully!",
        "spanish": "El recibo se ha adjuntado correctamente!"
    },
    NotifText:{
        "english": "Your receipt has been",
        "spanish": "El recibo se ha adjuntado"
    }
}
