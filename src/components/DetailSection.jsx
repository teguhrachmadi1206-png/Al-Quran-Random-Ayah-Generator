import elements from "../language"
import { useState, useRef, useEffect } from "react"

export default function DetailSection({ surah, currentNumber, language, showAyahDetails, setShowAyahDetails }) {
    const text = elements[language]
    const [showArabic, setShowArabic] = useState(false)
    const [showLatin, setShowLatin] = useState(false)
    const [showTranslation, setShowTranslation] = useState(false)
    const arabicStartRef = useRef(null)
    const latinStartRef = useRef(null)
    const translationStartRef = useRef(null)

    useEffect(() => {
        if (showTranslation) {
            translationStartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [showTranslation])

    useEffect(() => {
        if (showLatin) {
            latinStartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [showLatin])

    useEffect(() => {
        if (showArabic) {
            arabicStartRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [showArabic])

    useEffect(() => {
        if (showAyahDetails) {
            setShowArabic(true)
            setShowLatin(true)
            setShowTranslation(true)
        } else {
            setShowArabic(false)
            setShowLatin(false)
            setShowTranslation(false)
        }
    }, [showAyahDetails, currentNumber])

    function toggleShowArabic() {
        if (currentNumber) {
            setShowArabic(prev => !prev)
        }
    }

    function toggleShowLatin() {
        if (currentNumber) {
            setShowLatin(prev => !prev)
        }
    }

    function toggleShowTranslation() {
        if (currentNumber) {
            setShowTranslation(prev => !prev)
        }
    }

    function toggleShowAll() {
        if (currentNumber) {
            if (showArabic || showLatin || showTranslation) {
                setShowArabic(false)
                setShowLatin(false)
                setShowTranslation(false)
                setShowAyahDetails(false)
            } else {
                setShowArabic(true)
                setShowLatin(true)
                setShowTranslation(true)
            }
        }
    }

    return (
        <section className="detail-section">
            <h2 className="sub-title">{text.subTitle3}</h2>
            <div className="display-ayah">
                <div className="detail-btn-container">
                    <button className="main-btn toggle" onClick={toggleShowArabic}>{showArabic ? text.arabicBtn.hide : text.arabicBtn.show}</button>
                    <button className="main-btn toggle" onClick={toggleShowLatin}>{showLatin ? text.latinBtn.hide : text.latinBtn.show}</button>
                    <button className="main-btn toggle" onClick={toggleShowTranslation}>{showTranslation ? text.translationBtn.hide : text.translationBtn.show}</button>
                    <button className="main-btn toggle all" onClick={toggleShowAll}>{(showArabic || showLatin || showTranslation) ? text.showAllBtn.hide : text.showAllBtn.show}</button>
                </div>
                {surah && <div className="show-detail">
                    {(showArabic || showLatin || showTranslation) && <h3 className="detail-title" >
                        {surah.number}. {surah.title} ({surah.titleTranslation}): {currentNumber}
                    </h3>}
                    {currentNumber && <div className="show-ayah">
                        <span ref={arabicStartRef}></span>
                        {showArabic && <p className="arabic-ayah" >{surah.ayahs[currentNumber - 1].ayahArabic}</p>}
                        <span ref={latinStartRef}></span>
                        {showLatin && <p className="latin-ayah" >{surah.ayahs[currentNumber - 1].ayahLatin} ({currentNumber})</p>}
                        <span ref={translationStartRef}></span>
                        {showTranslation && <p className="translate-ayah" >{surah.ayahs[currentNumber - 1].ayahTranslation} ({currentNumber})</p>}
                    </div>}
                </div>}
            </div>
        </section>
    )
}