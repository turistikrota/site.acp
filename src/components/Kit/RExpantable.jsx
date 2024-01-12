import { useState } from "react";

const RExpantable = ({ children, open, icon, title }) => {
    const [isOpen, setIsOpen] = useState(open);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <a onClick={toggle} to="/#" className="d-flex justify-content-between not-redirectable">
                <div>
                    <i className={icon}></i>
                    <span>{title}</span>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                    <i className={`bx unset-min-width menu-icon bx-chevron-down`} style={{
                        transition: 'all 0.3s ease-in-out',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}></i>
                </div>
            </a>
            {isOpen && children}
        </>
    )
}

export default RExpantable;