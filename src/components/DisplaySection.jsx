import elements from "../language"
import { useRef, useEffect } from "react"

export default function DisplaySection({ numberList, showDetail, totalLength, noRepeat, mainNumber, language }) {
    const list = numberList
        ? numberList.map((num, index) => <span className="list-number" key={index} value={num} onClick={showDetail}>{num}</span>)
        : null
    const text = elements[language]
    const ayahsLeft = totalLength - numberList.length
    const listEndRef = useRef(null)

    useEffect(() => {
        if (numberList.length) {
            listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [numberList])

    return (
        <section className="display-section">
            <div className="sub-title-row">
                <h2 className="sub-title">{text.subTitle2}</h2>
                {totalLength > 0 && noRepeat && numberList.length > 0 && <span>{ayahsLeft} {text.ayahsLeft}</span>}
            </div>
            <div className="display-number">
                <div className="display-list">
                    {list}
                    <span ref={listEndRef}></span>
                </div>
                <h2 className="main-number">{mainNumber}</h2>
            </div>
        </section>
    )
}