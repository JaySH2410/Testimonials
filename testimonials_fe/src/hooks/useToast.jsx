import { useCallback } from "react";
import { useToast as shadcnUseToast} from "@/components/hooks/use-toast"

const useToast = () => {
    const { toast } = shadcnUseToast();
    function myToast({ title, description, duration }) {
        const t = toast({
            title: title,
            description: description,
        });

        // console.log(t);
        
        setTimeout(() => {
            t.dismiss(t.id);
        }, duration)
        return t;
    }
    return myToast;
}

export default useToast;