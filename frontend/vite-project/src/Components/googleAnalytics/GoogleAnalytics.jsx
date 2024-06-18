// import { useEffect } from "react";

// const GoogleAnalytics = () => {
//     useEffect(() => {
//         // Crear el script de Google Analytics
//         const script = document.createElement("script");
//         script.src = "https://www.googletagmanager.com/gtag/js?id=G-WQW9NEGWGQ";
//         script.async = true;
//         document.head.appendChild(script);

//         // Configuración de Google Analytics
//         const gtagScript = document.createElement("script");
//         gtagScript.innerHTML = `
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-WQW9NEGWGQ');
//         `;
//         document.head.appendChild(gtagScript);

//         // Limpiar los scripts al desmontar el componente
//         return () => {
//             document.head.removeChild(script);
//             document.head.removeChild(gtagScript);
//         };
//     }, []);

//     return null; // Este componente no necesita renderizar nada en la interfaz
// };

// export default GoogleAnalytics;
