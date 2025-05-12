// 'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';
// import { usePathname } from 'next/navigation';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const pathname = usePathname();
    return (
        <div>
            <Header />
            <SubHeader />
            <main>{children}</main>
            <Footer />
        </div>
    )
};