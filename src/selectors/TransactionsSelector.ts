import { LanguageKey } from '../utils/utils';

export const transactions: Record<string, Record<LanguageKey, string>> = {
    SendPayment: {
        "english": "Send Payment",
        "spanish": "Enviar pago"
    },
    PayBill: {
        "english": "Pay Bill",
        "spanish": "Pago de servicios"
    },
    PayNewVendor: {
        "english": "Pay a New Vendor",
        "spanish": "Pago a nuevo proveedor"
    },
    PayExistingVendor: {
        "english": "Pay an Existing Vendor",
        "spanish": "Pago a proveedor existente"
    },
    PayBulk: {
        "english": "Pay in Bulk (SPEI)",
        "spanish": "Pagos masivos (SPEI)"
    },
    DownloadTransactions: {
        "english": "Download Transactions",
        "spanish": "Descarga Transacciones"
    },
    Date:{
        "english": "Date",
        "spanish": "Fecha"
    },
    Today:{
        "english": "Today",
        "spanish": "Hoy"
    },
    Apply:{
        "english": "Apply",
        "spanish": "Aplicar"
    }
}
