import elements from "../language"
import { useState, useEffect } from "react"

export default function InputSection({ data, changeSurah, surah, firstNumber, secondNumber, generate, repeat, numberList, first, second, reset, language, nextSurah, chosenSurah }) {
    const surahSelections = data.map(surah => <option key={surah.number} value={surah.number}>{surah.number}. {surah.title}</option>)
    const ayahNumberList = surah ? surah.ayahs.map(ayah => <option key={ayah.ayahNumber} value={ayah.ayahNumber}>{ayah.ayahNumber}</option>) : null
    const text = elements[language]
    const [showNextSurahButton, setShowNextSurahButton] = useState(false)

    useEffect(() => {
        if (surah) {
            setShowNextSurahButton(false)
        }
    }, [surah])

    // function test() {
    //     console.log(chosenSurah)
    // }

    return (
        <section className="input-section">
            <h2 className="sub-title">{text.subTitle1}</h2>
            <div className="input-data">
                <div className="select-container">
                    <select name="surah" className="input-item" onChange={changeSurah} value={chosenSurah}>
                        <option value={0} disabled hidden>{text.selectSurah}</option>
                        {surahSelections}
                    </select>
                    <select type="number" name="first-number" className="input-number input-item" onChange={firstNumber} value={first}>
                        {ayahNumberList}
                    </select>
                    <select type="number" name="second-number" className="input-number input-item" onChange={secondNumber} value={second}>
                        {ayahNumberList}
                    </select>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" id="no-repeat" className="main-box input-item" onChange={repeat} defaultChecked />
                    <label htmlFor="no-repeat">{text.noRepeat}</label>
                </div>
            </div>
            <div className="buttons">
                <button className="main-btn" onClick={generate}>{
                    numberList.length
                        ? text.generateBtn.next
                        : text.generateBtn.generate
                }</button>
                {showNextSurahButton && <button className="main-btn" onClick={nextSurah}>
                    {text.nextSurahBtn}
                </button>}
            </div>
            {/* <button onClick={test}>TEST</button> */}
        </section >
    )
}