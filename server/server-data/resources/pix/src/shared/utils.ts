export const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

export const validatePixAddressKey = (key: string) => {
    if (isCpf(key)) return true;
    if (isCnpj(key)) return true;
    if (isEmail(key)) return true;
    if (isPhone(key)) return true;

    return false;
}

export const formatPixAddressKey = (key: string) => {
    const cleaned = cleanString(key);
    
    if (isCpf(cleaned)) {
        return formatCPF(cleaned)
    }
    
    if (isCnpj(cleaned)) {
        return formatCNPJ(cleaned)
    }
    
    if (isEmail(cleaned)) {
        return key.toLowerCase()
    }
    
    if (isPhone(cleaned)) {
        return formatPhone(cleaned)
    }
    
    return null;
}; 

export const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export const cleanString = (value: string) => {
    return value.replace(/\D/g, '');
}

function isCpf(key: string) {
    return key.length === 11;
}

function isCnpj(key: string) {
    return key.length === 14;
}

function isEmail(key: string) {
    return key.includes('@');
}

function isPhone(key: string) {
    return key.length === 10 || key.length === 11;
}