export const FormattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
});

export const formatPrice = (price: number) => {
    const formattedPrice = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);

    const subCurrencyPrice = (price: string) => {
        return Math.round(Number(price) * 100);
    };

    return subCurrencyPrice(formattedPrice);
};