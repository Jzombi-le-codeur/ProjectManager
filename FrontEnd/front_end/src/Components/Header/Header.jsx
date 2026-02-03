import { Link } from "react-router-dom";
import "../../Styles/header.css";


export default function Header() {
    return (
        <header className="header">
            <div className="header-brand">
                <h1 className="header-home-button"><Link to="/">Acceuil</Link></h1>
            </div>
        </header>
    )
}