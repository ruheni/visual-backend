import { Badge } from "@/components/ui/badge"
import { ItemTypes } from "@/pages"
import React from 'react'
import { useDrag } from "react-dnd"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ConnectDragSource } from "react-dnd"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-800 w-fit cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/80",
        outline: "text-slate-950 dark:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface DragableBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
      name: string,
      id: string,
    }

export default function DraggableFieldTag({name, id, className, variant, ...props}: DragableBadgeProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FIELD_TAGS,
    item: { id: id, field_name: name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} ref={drag}>{name}</div>
  )
}
