import elements from "../language"
import { useState, useEffect } from "react"

export default function InputSection(
    {
        data,
        surahData,
        nextNumber,
        repeat,
        setNoRepeat,
        numberList,
        setGeneratedList,
        resetState,
        language,
        chosenSurah,
        setChosenSurah,
        showNextSurahButton,
        setShowNextSurahButton
    }) {
    const surahSelections = data.map(surah => <option key={surah.number} value={surah.number}>{surah.number}. {surah.title}</option>)
    const ayahNumberList = surahData ? surahData.ayahs.map(ayah => <option key={ayah.ayahNumber} value={ayah.ayahNumber}>{ayah.ayahNumber}</option>) : null
    const [firstNumber, setFirstNumber] = useState(1)
    const [secondNumber, setSecondNumber] = useState(1)
    const text = elements[language]

    useEffect(() => {
        setGeneratedList(generateNumberList(firstNumber, secondNumber))
        resetState()
    }, [firstNumber, secondNumber, surahData])

    useEffect(() => {
        if (surahData) {
            setFirstNumber(1)
            setSecondNumber(surahData.ayahs.length)
            setShowNextSurahButton(false)
        }
    }, [surahData])

    function generateNumberList(firstNum, secondNum) {
        if (secondNum <= firstNum) {
            return []
        }
        const randomList = []
        const length = secondNum - firstNum + 1
        while (randomList.length !== length) {
            const random = Number(Math.floor(Math.random() * (secondNum - firstNum + 1))) + Number(firstNum)
            if (!randomList.includes(random)) {
                randomList.push(random)
            }
        }
        return randomList
    }

    function nextSurah() {
        setChosenSurah(prev => Number(prev) + 1)
    }

    return (
        <section className="input-section">
            <h2 className="sub-title">{text.subTitle1}</h2>
            <div className="input-data">
                <div className="select-container">
                    <select
                        name="surah"
                        className="input-item"
                        onChange={(e) => setChosenSurah(e.currentTarget.value)}
                        value={chosenSurah}>
                        <option value={0} disabled hidden>{text.selectSurah}</option>
                        {surahSelections}
                    </select>
                    <select
                        type="number"
                        name="first-number"
                        className="input-number input-item"
                        onChange={(e) => setFirstNumber(e.currentTarget.value)}
                        value={firstNumber}>
                        {ayahNumberList}
                    </select>
                    <select
                        type="number"
                        name="second-number"
                        className="input-number input-item"
                        onChange={(e) => setSecondNumber(e.currentTarget.value)}
                        value={secondNumber}>
                        {ayahNumberList}
                    </select>
                </div>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="no-repeat"
                        className="main-box input-item"
                        onChange={() => {
                            setNoRepeat(prev => !prev)
                            resetState()
                        }}
                        defaultChecked />
                    <label htmlFor="no-repeat">{text.noRepeat}</label>
                </div>
            </div>
            <div className="buttons">
                <button className="main-btn" onClick={nextNumber}>{
                    numberList.length
                        ? text.generateBtn.next
                        : text.generateBtn.generate
                }</button>
                {showNextSurahButton && <button className="main-btn" onClick={nextSurah}>
                    {text.nextSurahBtn}
                </button>}
            </div>
        </section >
    )
}