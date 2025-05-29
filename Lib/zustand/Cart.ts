import { CartStore } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { handleError } from '../utils/HandleResponse';

export const useCartStore = create<CartStore>() (
    persist(
        (set, get) => ({
            items: [],
            loading: false,
            totalPrice: 0,
            setCart: (cart) => {
                set({ loading: true });
                try {
                    set({
                        items: cart?.cartItems,
                        totalPrice: cart?.totalPrice
                    });
                } catch (error) {
                    handleError(error);
                } finally {
                    set({ loading: false });
                }
            },
            addItem: (item) => {
                try {
                    const existing = get().items.find((i) => i.productId === item.productId);

                    if (existing) {
                        const updateItems = get().items.map((i) =>
                            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
                        );

                        set({ items: updateItems, loading: true });
                    } else {
                        set({ items: [ ...get().items, item ], loading: true });
                    };
                } catch (error) {
                    handleError(error);
                } finally {
                    setTimeout(() => set({ loading: false }), 500);
                }
            },
            removeItem: (productId) => {
                try {
                    const updateItems = get().items.filter((item) => item.productId !== productId);
                    console.log('X===X', updateItems);
                    set({ items: updateItems, loading: true });
                } catch (error) {
                    handleError(error);
                } finally {
                    setTimeout(() => set({ loading: false }), 500);
                }
            },
            clearCart: () => {
                try {
                    set({ items: [], totalPrice: 0, loading: true });
                } catch (error) {
                    handleError(error);
                } finally {
                    setTimeout(() => set({ loading: false }), 500);
                }
            },
            setTotalPrice: (totalPrice) => {
                try {
                    set({ totalPrice })
                } catch (error) {
                    handleError(error);
                }
            }
        }),
        {
            name: 'cart-storage'
        }
    )
)