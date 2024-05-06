import '../css/Styles.css'

export const Footer = () => {
    return ( 
        <footer className="bg-gray-700 text-white p-4 text-center">
            <p>Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </footer>
     );
}
