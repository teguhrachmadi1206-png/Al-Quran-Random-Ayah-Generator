import elements from "../language"

export default function DetailSection(props) {
    const text = elements[props.language]

    return (
        <section className="detail-section">
            <h2 className="sub-title">{text.subTitle3}</h2>
            <div className="display-ayah">
                <div className="detail-btn-container">
                    <button className="main-btn toggle" onClick={props.toggleArabic}>{props.showArabic ? text.arabicBtn.hide : text.arabicBtn.show}</button>
                    <button className="main-btn toggle" onClick={props.toggleLatin}>{props.showLatin ? text.latinBtn.hide : text.latinBtn.show}</button>
                    <button className="main-btn toggle" onClick={props.toggleTranslation}>{props.showTranslation ? text.translationBtn.hide : text.translationBtn.show}</button>
                    <button className="main-btn toggle all" onClick={props.toggleAll}>{(props.showArabic || props.showLatin || props.showTranslation) ? text.showAllBtn.hide : text.showAllBtn.show}</button>
                </div>
                {props.surah && <div className="show-detail">
                    {(props.showArabic || props.showLatin || props.showTranslation) && <h3 className="detail-title" >
                        {props.surah.number}. {props.surah.title} ({props.surah.titleTranslation}): {props.number}
                    </h3>}
                    {props.number && <div className="show-ayah">
                        <span ref={props.arabicStart}></span>
                        {props.showArabic && <p className="arabic-ayah" >{props.surah.ayahs[props.number - 1].ayahArabic}</p>}
                        <span ref={props.latinStart}></span>
                        {props.showLatin && <p className="latin-ayah" >{props.surah.ayahs[props.number - 1].ayahLatin} ({props.number})</p>}
                        <span ref={props.translationStart}></span>
                        {props.showTranslation && <p className="translate-ayah" >{props.surah.ayahs[props.number - 1].ayahTranslation} ({props.number})</p>}
                    </div>}
                </div>}
            </div>
        </section>
    )
}