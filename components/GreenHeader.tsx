'use client';

import React, { ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react';

interface MyComponentProps {
    children: ReactNode;
};

const GreenHeader = ({ children }: MyComponentProps) => {
    const { scrollY } = useScroll();
    const background = useTransform(scrollY, [0, 700], ['transparent', '#000']);
    const borderRadius = useTransform(scrollY, [0, 700], ['0px', '20px']);
    return (
        <motion.header
            style={{
                backgroundColor: background,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius
            }}
        >{children}</motion.header>
    )
}

export default GreenHeader