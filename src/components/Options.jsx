import elements from "../language"

export default function Options({ language, close, changeLanguage }) {
    const text = elements[language]
    return (
        <div className="options-box">
            <div className="options-header">
                <div className="lang-container">
                    <label htmlFor="select-lang">{text.language}</label>
                    <select name="language" id="select-lang" className="select-lang" onChange={changeLanguage} defaultValue={language}>
                        <option value="english">English</option>
                        <option value="indonesia">Indonesia</option>
                    </select>
                </div>
                <button onClick={close} className="main-btn how-to-btn">{text.closeOptions}</button>
            </div>
            <div className="how-to-use-header">
                <h2 className="how-to-main-header">{text.howToDesc.header}<span>{text.howToDesc.version}</span></h2>
                <p className="how-to-desc">{text.howToDesc.mainDesc}</p>
            </div>
            <div className="how-to-desc-container">
                <h3 className="how-to-sub-header">{text.howToDesc.subHeader1}</h3>
                <p className="how-to-desc">{text.howToDesc.subDesc1A}</p>
                <p className="how-to-desc">{text.howToDesc.subDesc1B}</p>
                <h3 className="how-to-sub-header">{text.howToDesc.subHeader2}</h3>
                <p className="how-to-desc">{text.howToDesc.subDesc2A}</p>
                <p className="how-to-desc">{text.howToDesc.subDesc2B}</p>
                <h3 className="how-to-sub-header">{text.howToDesc.subHeader3}</h3>
                <p className="how-to-desc">{text.howToDesc.subDesc3A}</p>
                <p className="how-to-desc">{text.howToDesc.subDesc3B}</p>
                <h3 className="how-to-sub-header">{text.howToDesc.subHeader4}</h3>
                <p className="how-to-desc">{text.howToDesc.subDesc4A}</p>
                <p className="how-to-desc">{text.howToDesc.subDesc4B}</p>
            </div>
            <div className="copyright">
                <p>© 2026 Teguh Rachmadi. All Rights Reserved</p>
            </div>
        </div>
    )
}