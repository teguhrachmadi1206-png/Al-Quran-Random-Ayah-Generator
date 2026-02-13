import elements from "../language"

export default function Header(props) {
    const text = elements[props.language]
    return (
        <header>
            <h1 className="title">Al-Quran <span>{text.title}</span></h1>
            <p className="version">{text.version}</p>
            <div className="options-icon" onClick={props.showOptions}>
                <div className="bullet"></div>
                <div className="bullet"></div>
                <div className="bullet"></div>
            </div>
        </header>
    )
}