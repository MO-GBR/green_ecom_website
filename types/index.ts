// ====== USER TYPES
export type User = {
    id?: string
    username: string | null | undefined
    email: string | null | undefined
    password?: string
    cart?: Cart
    providerAccountId?: string
    resetPasswordToken?: string
    resetPasswordExpire?: number
    createdAt?: Date
    updatedAt?: Date
}

// ====== USER TYPES
export type OrderType = {
    id?: string
    buyerId?: string
    amount: number
    stripeId?: string
    address: string
    list?: any
    createdAt?: Date
    updatedAt?: Date
};

export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    buyerId: string
};

// ====== CART TYPES
export type Cart = {
    id?: string
    user?: User
    userId: string
    cartItems: CartItemType[]
    totalPrice: number
    createdAt?: Date
    updatedAt?: Date
};

export type CartItemType = {
    id?: string
    cartId: string
    cart?: Cart
    productId: string
    quantity: number
    createdAt?: Date
    updatedAt?: Date
};

// ====== PRODUCT TYPES
export type Product = {
    id?: string
    title: string
    description: string
    img: string
    price: number
    rating: number | null
    category: string
    createdAt?: Date
    updatedAt?: Date
};

// ====== COMPONENTS TYPES
export type GreenButton = {
    href?: string
    icon?: string
    type: "button" | "reset" | "submit" | undefined
    text: string
    event?: () => void
};

export type CategoryType = {
    img: string
    title: string
    bgColor: string
    category: string
};

export type FeatureType = {
    img: string
    feature: string
    description: string
};

export type FeatureColumnType = {
    title: string
    links: string[]
};

export type UpdatePasswordType = {
    password?: string
    resetPasswordToken: string | null | undefined
    resetPasswordExpire: Date | null | undefined
}

// ====== ZUSTAND TYPES
export type CartStore = {
    items: CartItemType[]
    loading: boolean
    totalPrice: number
    setCart: (cart: Cart) => void
    addItem: (item: CartItemType) => void
    removeItem: (productId: string) => void
    clearCart: () => void
    setTotalPrice: (totalPrice: number) => void
};

// ====== SERVER ACTIONS TYPES
export type ActionState = {
    success: boolean
    message: string
    data?: any
};

// ====== UTILS TYPES
export type EmailOptionsType = {
    from?: string
    to: string
    subject: string
    html: string
}

// ====== ZOD TYPES
export type RegisterRawDataType = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
};

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
};

export type PageProps = {
    params: Promise<{ id: string, category: string, resetToken: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

// ====== AUTH JS TYPES
export type AuthSession = {
    user: {
        id: string
        name: string
        email: string
        image: string | null
    },
    expires: string
}