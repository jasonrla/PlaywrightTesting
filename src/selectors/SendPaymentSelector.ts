import { LanguageKey } from '../utils/utils';

export const send_payment: Record<string, Record<LanguageKey, string>> = {
    Back: {
        "english": "Back",
        "spanish": "Atrás"
    },
    YesExit: {
        "english": "Yes, exit",
        "spanish": "Sí, salir"
    },
    CancelChanges: {
        "english": "Cancel",
        "spanish": "Cancelar"
    },
    Local: {
        "english": "Local",
        "spanish": "Local"
    },
    International: {
        "english": "International",
        "spanish": "Internacional"
    },
    ClabeNumber: {
        "english": "Enter a 18-digit number",
        "spanish": "Ingresa un número de 18 dí"
    },
    CreateAndProceed: {
        "english": "Create and Proceed",
        "spanish": "Crear y Continuar"
    },
    Cancel:{
        "english": "Cancel",
        "spanish": "Cancelar"
    },
    Next:{
        "english": "Next",
        "spanish": "Siguiente"
    },
    ConfirmPayment:{
        "english": "Confirm Payment",
        "spanish": "Confirmar Pago"
    },
    AmountMXNUSD:{
        "english": (/^AmountMXNUSD \$0\.00$/).toString(),
        "spanish": (/^CantidadMXNUSD \$0\.00$/).toString()
    },
    AmountUSDUSD:{
        "english": (/^AmountUSDUSD \$0\.00$/).toString(),
        "spanish": (/^CantidadUSDUSD \$0\.00$/).toString()
    },
    Done:{
        "english": "Done",
        "spanish": "Hecho"
    },
    UploadDocument:{
        "english": "Upload document",
        "spanish": "Cargar documento"
    },
    VendorName:{
        "english": "Vendor Name",
        "spanish": "Nombre del proveedor"
    },
    VendorEmail:{
        "english": "Vendor Email",
        "spanish": "Email del proveedor"
    },
    ReferenceNumber:{
        "english": "Reference Number (optional)",
        "spanish": "Referencia numérica (opcional)"
    },
    UploadedTransactions:{
        "english": "Uploaded Transactions",
        "spanish": "Transacciones cargadas"
    },
}

export const error_message: Record<string, Record<LanguageKey, string>> = {
    MinAmount: {
        "english": "Please increase the amount to",
        "spanish": "Por favor, incrementa la"
    },
}

//export const VendorName = "chakra-input css-705ssv"// "#field-13";
//export const VendorEmail = "#field-14";
export const AccountHolderName = "#field-15";
export const ClabeNumber = "#field-16";
export const Close = 'Close';

//export const Address = "#field-19";
export const Country = ".css-1hwfws3";
export const State = ".css-sf5wl1-control > .css-1hwfws3";
//export const City = "#field-20";
//export const ZipCode = "#field-21";
//export const Phone = "#field-22";
//export const SwiftCode = "#field-23";

export const PaymentConcept = ".chakra-input.css-705ssv";
//export const ReferenceNumber = "#field-22";
export const TermsCondition1 = ".chakra-checkbox__control";
export const TermsCondition2 = "div:nth-child(10) > .chakra-checkbox > .chakra-checkbox__control";
//export const ConfirmPayment = "#field-29";
export const BulkPaymentTermsCondition = "label span";

//export const AccountNumber = "#field-24";
//export const ABANumber = "#field-25";
//export const PaymentConceptInter = "#field-28";

