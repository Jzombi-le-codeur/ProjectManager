import { Link } from "react-router-dom";
import "../../Styles/header.css";


export default function Header() {
    return (
        <header className="header">
            <div className="header-brand">
                <h1 className="header-home-button"><Link to="/">Acceuil</Link></h1>
            </div>
            <div className="header-menu-container">
                <ul className="header-menu">
                    <li className="header-menu-item">Dark Mode</li>
                </ul>
            </div>
        </header>
    )
}