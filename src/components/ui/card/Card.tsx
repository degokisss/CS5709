import React, {type ReactNode } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import './Card.css';

interface CardProps extends MotionProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false, ...props }) => {
    return (
        <motion.div
            className={clsx(
                'card',
                hover && 'card-hover',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;