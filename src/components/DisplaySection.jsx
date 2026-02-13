import elements from "../language"

export default function DisplaySection(props) {
    const list = props.numberList
        ? props.numberList.map((num, index) => <span className="list-number" key={index} value={num} onClick={props.showDetail}>{num}</span>)
        : null
    const text = elements[props.language]

    return (
        <section className="display-section">
            <h2 className="sub-title">{text.subTitle2}</h2>
            <div className="display-number">
                <div className="display-list">
                    {list}
                    <span ref={props.listEnd}></span>
                </div>
                <h2 className="main-number">{props.mainNumber}</h2>
                {props.message && <p className="message">{props.message}</p>}
            </div>
        </section>
    )
}