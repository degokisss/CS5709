import React, {type ButtonHTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps & MotionProps> = ({
                                                         variant = 'primary',
                                                         size = 'md',
                                                         children,
                                                         className,
                                                         ...props
                                                     }) => {
    return (
        <motion.button
            className={clsx(
                'btn',
                `btn-${variant}`,
                `btn-${size}`,
                className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;