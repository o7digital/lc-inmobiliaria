"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { animationCreate } from "@/utils/utils";
import ScrollToTop from "@/components/common/ScrollToTop";
import Link from "next/link";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: any) => {
    const pathname = usePathname();
    const isEnglish = pathname?.startsWith("/en");
    const privacyHref = isEnglish ? "/en/privacy-policy" : "/aviso-privacidad";
    const privacyLabel = isEnglish ? "🔒 Privacy Policy" : "🔒 Aviso de Privacidad";

    useEffect(() => {
        // animation
        const timer = setTimeout(() => {
            animationCreate();
        }, 100);

        return () => clearTimeout(timer);
    }, []);


    return <>
        {children}
        <ScrollToTop />
        <ToastContainer position="top-center" />
        
        {/* Bouton WhatsApp en bas à droite */}
        <Link
            href="https://wa.me/5215555555555"
            target="_blank"
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{
               bottom: '20px',
               right: '20px',
               width: '60px',
               height: '60px',
               borderRadius: '50%',
               backgroundColor: '#25D366',
               color: 'white',
               fontSize: '32px',
               zIndex: 9999,
               boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
               textDecoration: 'none',
               transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
         >
            <i className="fa-brands fa-whatsapp"></i>
         </Link>

         {/* Bouton Aviso de Privacidad en bas à gauche */}
         <Link
            href={privacyHref}
            className="btn btn-primary position-fixed"
            style={{
               bottom: '20px',
               left: '20px',
               borderRadius: '20px',
               padding: '8px 16px',
               fontSize: '12px',
               zIndex: 9999,
               boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
               textDecoration: 'none'
            }}
         >
            {privacyLabel}
         </Link>
    </>;
}

export default Wrapper
