import { CardProps } from "@/types/Card"; 
import { cn } from "@/utils/cnHelper";

export default function Card ({
children,
classname,
clickable=false,
onClick
}:CardProps){
    return(
        <div  onClick={clickable ? onClick : undefined} className={cn("rounded-xl bg-white p-5 shadow-md",
                            clickable&& "cursor-pointer transition hover:-translate-y-1 hover:shadow-lg",
                            classname)} >
            {children}
        </div>
    )
} 