import elements from "../language"
import { useState, useEffect, useMemo } from "react"

export default function InputSection({ setCurrentNumber, setNumberList, list, setList, noRepeat, setMessage, showNextSurahButton, data, changeSurah, surah, chooseFirstNum, chooseSecondNum, generate, repeat, numberList, firstNum, secondNum, language, nextSurah, chosenSurah }) {
    const surahSelections = data.map(surah => <option key={surah.number} value={surah.number}>{surah.number}. {surah.title}</option>)
    const ayahNumberList = surah ? surah.ayahs.map(ayah => <option key={ayah.ayahNumber} value={ayah.ayahNumber}>{ayah.ayahNumber}</option>) : null
    const text = elements[language]
    const [currentIndex, setCurrentIndex] = useState(0)
    let generatedList = useMemo(() => generateNumberList(firstNum, secondNum), [firstNum, secondNum, chosenSurah])

    useEffect(() => {
        setList(generatedList)
    }, [generatedList])

    function generateNumberList(firstNum, secondNum) {
        if (secondNum <= firstNum) {
            return []
        }
        const randomList = []
        const length = secondNum - firstNum + 1
        while (randomList.length !== length) {
            const random = Math.floor(Math.random() * (secondNum - firstNum + 1) + firstNum)
            if (!randomList.includes(random)) {
                randomList.push(random)
            }
        }
        return randomList
    }

    function nextNumber() {
        if (!chosenSurah) {
            setMessage(text.message.chooseSurah)
            return
        }
        if (!generatedList.length) {
            setMessage(text.message.invalidNumber)
            return
        }
        if (!noRepeat) {
            const randomIndex = Math.floor(Math.random() * generatedList.length)
            setCurrentNumber(generatedList[randomIndex])
            setNumberList(prevList => [...prevList, generatedList[randomIndex]])
        } else {
            if (currentIndex !== generatedList.length) {
                setCurrentNumber(generatedList[currentIndex])
                setNumberList(prevList => [...prevList, generatedList[currentIndex]])
                setCurrentIndex(prev => prev + 1)
            } else {
                setMessage(text.message.noNumber)
                if (numberList.length === surahData.ayahs.length && Number(chosenSurah) < 114) {
                    setShowNextSurahButton(true)
                }
            }
        }
        setShowAyahDetails(false)
    }

    function test() {
        console.log("numberList")
    }

    return (
        <section className="input-section">
            <h2 className="sub-title">{text.subTitle1}</h2>
            <div className="input-data">
                <div className="select-container">
                    <select name="surah" className="input-item" onChange={changeSurah} value={chosenSurah}>
                        <option value={0} disabled hidden>{text.selectSurah}</option>
                        {surahSelections}
                    </select>
                    <select type="number" name="first-number" className="input-number input-item" onChange={chooseFirstNum} value={firstNum}>
                        {ayahNumberList}
                    </select>
                    <select type="number" name="second-number" className="input-number input-item" onChange={chooseSecondNum} value={secondNum}>
                        {ayahNumberList}
                    </select>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" id="no-repeat" className="main-box input-item" onChange={repeat} defaultChecked />
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
            <button onClick={test}>TESTA</button>
        </section >
    )
}