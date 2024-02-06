import { LanguageKey } from '../utils/utils';

export const langSelector = '#menu-button-8'; 
export const engOption = '#menu-list-8-menuitem-5 > div:nth-child(1)';
export const spaOption = '#menu-list-8-menuitem-6 > div:nth-child(1)';

export const dashboard: Record<string, Record<LanguageKey, string>> = {
    Dashboard: {
        "english": "Dashboard",
        "spanish": "Panel de control"
    },
    Cards: {
        "english": "Cards",
        "spanish": "Tarjetas"
    },
    Users:{
        "english": "Users",
        "spanish": "Usuarios"
    },
    TribalPay: {
        "english": "Tribal Pay",
        "spanish": "Tribal Pay"
    },
    Statements: {
        "english": "Statements",
        "spanish": "Estados de cuenta"
    },
    Reports: {
        "english": "Reports",
        "spanish": "Reportes"
    },
}

export const dashboard_tribalPay: Record<string, Record<LanguageKey, string>> = {
    Transactions: {
        "english": "Transactions",
        "spanish": "Transacciones"
    },
    Bills: {
        "english": "Bills",
        "spanish": "Recibos"
    },
    Vendors: {
        "english": "Vendors",
        "spanish": "Proveedores"
    },
    Approvals:{
        "english": "Approvals",
        "spanish": "Aprobaciones"
    },
    Scheduled:{
        "english": "Scheduled",
        "spanish": "Programado"
    },
    Canceled:{
        "english": "Canceled",
        "spanish": "Cancelado"
    },
}

export const dashboard_cards: Record<string, Record<LanguageKey, string>> = {
    MyCards: {
        "english": "My Cards",
        "spanish": "Mis Tarjetas"
    },
    AllCards: {
        "english": "All Cards",
        "spanish": "Todas las Tarjetas"
    },
    Invitations: {
        "english": "Invitations",
        "spanish": "Invitaciones"
    }
}
