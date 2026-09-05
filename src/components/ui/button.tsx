import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ButtonHTMLAttributes } from 'react';

const variants = cva('button', {
  variants: { variant: { default: 'button-primary', outline: 'button-outline' } },
  defaultVariants: { variant: 'default' },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {
  /** Render the child element (e.g. a Link) with button styling instead of a nested <button>. */
  asChild?: boolean;
}

export function Button({ asChild, className, variant, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button';
  return <Component className={twMerge(clsx(variants({ variant }), className))} {...props} />;
}
