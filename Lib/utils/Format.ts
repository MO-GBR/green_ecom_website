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

export const formatLineItems = (userId: string, price: number) => {
    return [
        {
            price_data: {
                currency: 'usd',
                product_data: { name: `This order made by ${userId}` },
                unit_amount: Math.round(price * 100),
            },
            quantity: 1,
        }
    ];
};

export const formatterNumber = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });