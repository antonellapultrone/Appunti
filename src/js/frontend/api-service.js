export async function fetchCardData() {
    try {
        const response = await fetch('/api/cards');
        if (!response.ok) throw new Error('Error en la solicitud');
        const cardData = await response.json();
        return cardData;
    } catch (error) {
        console.error('Error al obtener los datos de las tarjetas:', error);
        return [];
    }
}
