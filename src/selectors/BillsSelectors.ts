import { LanguageKey } from '../utils/utils';

export const bills: Record<string, Record<LanguageKey, string>> = {
    PayNewBill: {
        'english': 'Pay New Bill',
        'spanish': 'Pagar nuevo servicio'
    },
    SelectTheCompany: {
        'english': 'Select the company',
        'spanish': 'Seleccionar compañia'
    },
    DigitsCodeAccount: {
        'english': '32 digits code',
        'spanish': 'dígitos del número de cuenta'
    },
    Next: {
        'english': 'Next',
        'spanish': 'Siguiente'
    },
    AmountToPay: {
        'english': 'Amount to pay',
        'spanish': 'Monto'
    },
    Date: {
        'english': 'DD/MM/YYYY',
        'spanish': 'DD/MM/YYYY'
    },
    ConfirmPayment: {
        'english': 'Confirm Payment',
        'spanish': 'Confirmar pago'
    },
    BackToBills: {
        'english': 'Back to Bills',
        'spanish': 'Volver a Facturas'
    }

}
