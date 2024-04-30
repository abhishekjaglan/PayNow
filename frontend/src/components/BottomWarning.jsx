import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to}){
    return (
        <div className="flex justify-center text-sm py-2">
            <div>
                {label}
            </div>
            <Link to={to} className="pointer pointer-cursor underline pl-1">
                {buttonText}
            </Link>
        </div>
    )
}