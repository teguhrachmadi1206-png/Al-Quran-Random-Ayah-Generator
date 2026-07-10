import elements from "../language"
import { useState, useRef, useEffect } from "react"

export default function DetailSection(
    {
        surah,
        currentNumber,
        language,
        detailShowed,
        setDetailShowed
    }) {
    const text = elements[language]
    const showArabic = detailShowed.arabic
    const showLatin = detailShowed.latin
    const showTranslation = detailShowed.translation
    const [isAudioPlayed, setIsAudioPlayed] = useState(false)
    const arabicStartRef = useRef(null)
    const latinStartRef = useRef(null)
    const translationStartRef = useRef(null)
    const audioRef = useRef(null)

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
        if (surah) {
            setIsAudioPlayed(false)
        }
    }, [currentNumber])

    function toggleShowArabic() {
        if (currentNumber) {
            setDetailShowed(prev => ({
                ...prev,
                arabic: !prev.arabic
            }))
        }
    }

    function toggleShowLatin() {
        if (currentNumber) {
            setDetailShowed(prev => ({
                ...prev,
                latin: !prev.latin
            }))
        }
    }

    function toggleShowTranslation() {
        if (currentNumber) {
            setDetailShowed(prev => ({
                ...prev,
                translation: !prev.translation
            }))
        }
    }

    function toggleShowAll() {
        if (currentNumber) {
            if (showArabic || showLatin || showTranslation) {
                setDetailShowed({
                    arabic: false,
                    latin: false,
                    translation: false
                })
            } else {
                setDetailShowed({
                    arabic: true,
                    latin: true,
                    translation: true
                })
            }
        }
    }

    function toggleAudio() {
        if (isAudioPlayed) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        } else {
            audioRef.current.play()
        }
        setIsAudioPlayed(prev => !prev)
    }

    function test() {
        console.log(surah.ayahs[currentNumber - 1])
    }

    return (
        <section className="detail-section">
            {surah?.ayahs && currentNumber && <audio ref={audioRef} src={surah.ayahs[currentNumber - 1].ayahAudio} onEnded={() => setIsAudioPlayed(false)} />}
            <h2 className="sub-title">{text.subTitle3}</h2>
            <div className="display-ayah">
                <div className="detail-btn-container">
                    <button className="main-btn toggle" onClick={toggleShowArabic}>{showArabic ? text.arabicBtn.hide : text.arabicBtn.show}</button>
                    <button className="main-btn toggle" onClick={toggleShowLatin}>{showLatin ? text.latinBtn.hide : text.latinBtn.show}</button>
                    <button className="main-btn toggle" onClick={toggleShowTranslation}>{showTranslation ? text.translationBtn.hide : text.translationBtn.show}</button>
                    <button className="main-btn toggle all" onClick={toggleShowAll}>{(showArabic || showLatin || showTranslation) ? text.showAllBtn.hide : text.showAllBtn.show}</button>
                </div>
                {surah && <div className="show-detail">
                    <div className="detail-title-row">
                        {(showArabic || showLatin || showTranslation) && <h3 className="detail-title" >
                            {surah.number}. {surah.title} ({surah.titleTranslation}): {currentNumber}
                        </h3>}
                        {currentNumber && showArabic && <button className='audio-button' onClick={toggleAudio}>{isAudioPlayed ? "◼" : "▶"} Audio</button>}
                    </div>
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
            {/* <button onClick={toggleAudio}>test</button> */}
        </section>
    )
}