import type { ReactNode} from "react";
import { useEffect, useState } from "react";

/**
 * 
 * Make sure that the component is only rendered on the client side
 */
export default function ClientOnly({ children }: { children: ReactNode }) {
    let [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
    return mounted ? <>{children}</> : null;
  }