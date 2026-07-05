import elements from "../language"

export default function Header({ language, showOptions }) {
    const text = elements[language]
    return (
        <header>
            <h1 className="title">Al-Quran <span>{text.title}</span></h1>
            <p className="version">{text.version}</p>
            <div className="options-icon" onClick={showOptions}>
                <div className="bullet"></div>
                <div className="bullet"></div>
                <div className="bullet"></div>
            </div>
        </header>
    )
}