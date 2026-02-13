import elements from "../language"

export default function InputSection(props) {
    const surahSelections = props.data.map(surah => <option key={surah.number} value={surah.number}>{surah.number}. {surah.title}</option>)
    const ayahNumberList = props.surah ? props.surah.ayahs.map(ayah => <option key={ayah.ayahNumber} value={ayah.ayahNumber}>{ayah.ayahNumber}</option>) : null
    const text = elements[props.language]

    return (
        <section className="input-section">
            <h2 className="sub-title">{text.subTitle1}</h2>
            <div className="input-data">
                <div className="select-container">
                    <select name="surah" className="input-item" onChange={props.changeSurah} defaultValue={""}>
                        <option value="" disabled hidden>{text.selectSurah}</option>
                        {surahSelections}
                    </select>
                    <select type="number" name="first-number" className="input-number input-item" onChange={props.firstNumber}>
                        {ayahNumberList}
                    </select>
                    <select type="number" name="second-number" className="input-number input-item" onChange={props.secondNumber} value={props.second}>
                        {ayahNumberList}
                    </select>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" className="main-box input-item" onChange={props.repeat} defaultChecked />
                    <label htmlFor="no-repeat">{text.noRepeat}</label>
                </div>
            </div>
            <div className="buttons">
                <button className="main-btn" onClick={props.generate}>{
                    props.numberList.length
                        ? text.generateBtn.next
                        : text.generateBtn.generate
                }</button>
            </div>
        </section >
    )
}