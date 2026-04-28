import { _NEVER } from "@reduxjs/toolkit/query";

export const capitalize = (str: string): string => {
    return str.trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export const normalizePhone = (phone: string): string => {
    return phone.replace(/\D/g, '');
}

interface Formfields {
    fullName: string;
    email: string;
    phone: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
}

export const validateLeadForm = (fields: Formfields): FormErrors => {
    const errors: FormErrors = {};

    if (!fields.fullName.trim()) {
        errors.fullName = 'El nombre completo es requerido';
    }else if (fields.fullName.trim().split(' ').length < 2) {
        errors.fullName = 'Por favor ingresa al menos nombre y apellido';
    }

    const emailRegex = /^[^\s@]+@javeriana\.edu\.co$/i;
    if (!fields.email.trim()) {
        errors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(fields.email.trim())) {
        errors.email = 'Por favor ingresa un correo electrónico válido de la Javeriana con dominio @javeriana.edu.co';
    }

    const phoneRegex = /^[0-9]{10}$/
    if(!fields.phone.trim()) {
        errors.phone = 'El número de teléfono es requerido';
    } else if (!phoneRegex.test(normalizePhone(fields.phone))) {
        errors.phone = 'Por favor ingresa un número de teléfono válido (10 dígitos)';
    }

    return errors;

}