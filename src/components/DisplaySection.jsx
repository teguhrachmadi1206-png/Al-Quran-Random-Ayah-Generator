import elements from "../language"
import { useRef, useEffect } from "react"

export default function DisplaySection(
    {
        numberList,
        totalLength,
        noRepeat,
        detailShowed,
        setDetailShowed,
        currentNumber,
        setCurrentNumber,
        language
    }) {
    const text = elements[language]
    const ayahsLeft = totalLength - numberList.length
    const listEndRef = useRef(null)

    useEffect(() => {
        if (numberList.length) {
            listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [numberList])

    function showListDetail(num) {
        if (currentNumber === num) {
            if (detailShowed.arabic || detailShowed.latin || detailShowed.translation) {
                setDetailShowed({
                    arabic: false,
                    latin: false,
                    translation: false
                })
            } else {
                setCurrentNumber(num)
                setDetailShowed({
                    arabic: true,
                    latin: true,
                    translation: true
                })
            }
        } else {
            setCurrentNumber(num)
            setDetailShowed({
                arabic: true,
                latin: true,
                translation: true
            })
        }
    }

    return (
        <section className="display-section">
            <div className="sub-title-row">
                <h2 className="sub-title">{text.subTitle2}</h2>
                {totalLength > 0 && noRepeat && numberList.length > 0 && <span>{ayahsLeft} {text.ayahsLeft}</span>}
            </div>
            <div className="display-number">
                <div className="display-list">
                    {numberList
                        ? numberList.map((num, index) =>
                            <span
                                className="list-number"
                                key={index}
                                value={num}
                                onClick={() => showListDetail(num)}
                            >{num}</span>
                        )
                        : null
                    }
                    <span ref={listEndRef}></span>
                </div>
                <h2 className="main-number">{currentNumber}</h2>
            </div>
        </section>
    )
}