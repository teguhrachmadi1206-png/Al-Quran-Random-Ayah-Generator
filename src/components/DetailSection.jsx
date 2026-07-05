import elements from "../language"

export default function DetailSection({ surah, number, toggleArabic, toggleLatin, toggleTranslation, toggleAll, showArabic, showLatin, showTranslation, language, arabicStart, latinStart, translationStart }) {
    const text = elements[language]

    return (
        <section className="detail-section">
            <h2 className="sub-title">{text.subTitle3}</h2>
            <div className="display-ayah">
                <div className="detail-btn-container">
                    <button className="main-btn toggle" onClick={toggleArabic}>{showArabic ? text.arabicBtn.hide : text.arabicBtn.show}</button>
                    <button className="main-btn toggle" onClick={toggleLatin}>{showLatin ? text.latinBtn.hide : text.latinBtn.show}</button>
                    <button className="main-btn toggle" onClick={toggleTranslation}>{showTranslation ? text.translationBtn.hide : text.translationBtn.show}</button>
                    <button className="main-btn toggle all" onClick={toggleAll}>{(showArabic || showLatin || showTranslation) ? text.showAllBtn.hide : text.showAllBtn.show}</button>
                </div>
                {surah && <div className="show-detail">
                    {(showArabic || showLatin || showTranslation) && <h3 className="detail-title" >
                        {surah.number}. {surah.title} ({surah.titleTranslation}): {number}
                    </h3>}
                    {number && <div className="show-ayah">
                        <span ref={arabicStart}></span>
                        {showArabic && <p className="arabic-ayah" >{surah.ayahs[number - 1].ayahArabic}</p>}
                        <span ref={latinStart}></span>
                        {showLatin && <p className="latin-ayah" >{surah.ayahs[number - 1].ayahLatin} ({number})</p>}
                        <span ref={translationStart}></span>
                        {showTranslation && <p className="translate-ayah" >{surah.ayahs[number - 1].ayahTranslation} ({number})</p>}
                    </div>}
                </div>}
            </div>
        </section>
    )
}