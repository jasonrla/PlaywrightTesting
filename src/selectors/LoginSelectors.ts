import { LanguageKey } from '../utils/utils';

export const username = '#username';
export const password = 'input.chakra-input:nth-child(1)';
export const clickButton = '.css-swe3bl'; 
export const forgotPasswordLink = '.css-1f623w2 > a:nth-child(1)';

//Error messages
export const invalidEmailText = '.css-10xc3dn';
export const invalidPasswordText = 'div.css-1pg7e5p:nth-child(2) > p:nth-child(3)';

//Language selector
export const langSelector = '#menu-button-4';
export const engOption = '#menu-list-4-menuitem-1';
export const spaOption = '#menu-list-4-menuitem-2';

//Support text and link
export const supportText = '.css-1f623w2';
export const supportLinkText = '.chakra-link';

//Elements of the page to be reached
export const tribalLogo = '.css-xwq0jy > img:nth-child(1)';
export const companyAvailableBlnc = '.css-157wn8n'
export const tribal2FAEnrollLogo = '.chakra-image';
export const tribal2FASixDigits = '.css-1oboy5l';

//reset-password
export const emailToReset = '#email';
export const backToSignInLink = '.css-itvw0n';
export const recoverPassButton = '.css-1wpfwkx';

export const login: Record<string, Record<LanguageKey, string>> = {
    supportText:{
        english: 'Having difficulty signing in? We are here to help.',
        spanish: '¿Tienes dificultades para acceder? Estamos aquí para ayudar.'
    },
    supportLinkText:{
        english: 'Click for support',
        spanish: 'Da click para soporte'
    },
    supportLinkURL:{
        english: 'https://support.tribal.mx/hc/en-us',
        spanish: 'https://support.tribal.mx/hc/es-mx'
    } 
}

export const login_errorMessages: Record<string, Record<LanguageKey, string>> = {
    noEmail: {
        english: 'Please enter a valid email.',
        spanish: 'Debe ser un correo electrónico válido'
    },
    noPassword: {
        english: 'Please enter a password.',
        spanish: 'Contraseña es requerida'
    }
}