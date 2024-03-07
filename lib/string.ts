export const lenghtText = (text: string, maxLength: number = 42): string => {
    // Verifica si el texto es válido y no es undefined.
    if (text && text.length <= maxLength) {
        // Si es así, devuelve el texto sin cambios.
        return text;
    } else {
        // Si el texto es undefined o supera el límite máximo, trunca el texto y agrega '...'.
        return text ? text.slice(0, maxLength) + '...' : '';
    }
}
