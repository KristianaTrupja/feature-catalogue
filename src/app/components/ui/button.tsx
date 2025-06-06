import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-inter font-bold rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-alowed disabled:hover:bg-primary disabled:hover:opacity-50 disabled:hover:text-white",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground border-solid border border-primary hover:bg-primary-foreground hover:text-primary hover:fill-primary",
                outline:
                    "border border-primary bg-background hover:bg-primary text-primary hover:text-white font-medium",
                secondary:
                    "bg-white text-primary border border-border font-light hover:bg-primary hover:border-primary hover:text-white",
                ghost: "hover:bg-accent hover:text-accent-foreground font-normal",
                link: "text-primary underline-offset-4 hover:underline",
                social: "text-white p-0 bg-btn-social hover:bg-primary"
            },
            size: {
                default: "h-10 px-12 py-5",
                sm: "h-8 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                edit: "h-8 px-4",
                save: "h-8 px-5",
                icon: "h-10 w-10",
                transparent: "h-10 px-0 py-5"
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
