import { useState, useEffect, useMemo, useRef } from 'react'
import Header from './components/Header'
import InputSection from './components/InputSection'
import DisplaySection from './components/DisplaySection'
import DetailSection from './components/DetailSection'
import elements from './language'
import Options from './components/Options'

function App() {
  const [language, setLanguage] = useState("indonesia")
  const [allQuranData, setAllQuranData] = useState(null)
  const [surahData, setSurahData] = useState(null)
  const [chosenSurah, setChosenSurah] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentNumber, setCurrentNumber] = useState(null)
  const [numberList, setNumberList] = useState([])
  const [message, setMessage] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [showAyahDetails, setShowAyahDetails] = useState(false)
  const [firstNumber, setFirstNumber] = useState(1)
  const [secondNumber, setSecondNumber] = useState(1)
  const [noRepeat, setNoRepeat] = useState(true)
  const [showNextSurahButton, setShowNextSurahButton] = useState(false)
  const [detailShowed, setDetailShowed] = useState({ arabic: false, latin: false, translation: false })
  const text = elements[language]

  let generatedList = useMemo(() => generateNumberList(firstNumber, secondNumber), [firstNumber, secondNumber, chosenSurah])

  useEffect(() => {
    if (language === "english") {
      fetch("https://equran.id/api/en/surah")
        .then(res => res.json())
        .then(data => {
          const numberAndTitle = []
          data.data.forEach(surah => numberAndTitle.push({ 'number': surah.number, 'title': surah.englishName }))
          setAllQuranData(numberAndTitle)
        })
    } else if (language === "indonesia") {
      fetch("https://equran.id/api/v2/surat")
        .then(res => res.json())
        .then(data => {
          const numberAndTitle = []
          data.data.forEach(surah => numberAndTitle.push({ 'number': surah.nomor, 'title': surah.namaLatin }))
          setAllQuranData(numberAndTitle)
        })
    }
  }, [language])

  useEffect(() => {
    if (language === "english") {
      chosenSurah &&
        fetch(`https://equran.id/api/en/surah/${chosenSurah}`)
          .then(res => res.json())
          .then(data => {
            const detailSurah = {}
            const detailAyah = []
            data.data.ayahs.forEach(ayah => {
              detailAyah.push({
                'ayahNumber': ayah.numberInSurah,
                'ayahArabic': ayah.textArabic,
                'ayahLatin': ayah.textLatin,
                'ayahTranslation': ayah.textEnglish
              })
            })
            detailSurah['title'] = data.data.englishName
            detailSurah['titleTranslation'] = data.data.englishNameTranslation
            detailSurah['number'] = data.data.number
            detailSurah['ayahs'] = detailAyah
            setSurahData(detailSurah)
          })
    } else if (language === "indonesia") {
      chosenSurah &&
        fetch(`https://equran.id/api/v2/surat/${chosenSurah}`)
          .then(res => res.json())
          .then(data => {
            const detailSurah = {}
            const detailAyah = []
            data.data.ayat.forEach(ayah => {
              detailAyah.push({
                'ayahNumber': ayah.nomorAyat,
                'ayahArabic': ayah.teksArab,
                'ayahLatin': ayah.teksLatin,
                'ayahTranslation': ayah.teksIndonesia
              })
            })
            detailSurah['title'] = data.data.namaLatin
            detailSurah['titleTranslation'] = data.data.arti
            detailSurah['number'] = data.data.nomor
            detailSurah['ayahs'] = detailAyah
            setSurahData(detailSurah)
          })
    }
  }, [chosenSurah, language])

  useEffect(() => {
    if (surahData) {
      setFirstNumber(1)
      setSecondNumber(surahData.ayahs.length)
      setShowNextSurahButton(false)
    }
  }, [surahData])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [message])

  function chooseSurah(surahNum) {
    setChosenSurah(surahNum)
    resetState()
  }

  function chooseFirstNumber(ayahNum) {
    setFirstNumber(Number(ayahNum))
    resetState()
  }

  function chooseSecondNumber(ayahNum) {
    setSecondNumber(Number(ayahNum))
    resetState()
  }

  function resetState() {
    setCurrentIndex(0)
    setMessage("")
    setNumberList([])
    setCurrentNumber(null)
    setDetailShowed({
      arabic: false,
      latin: false,
      translation: false
    })
  }

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
    setDetailShowed({
      arabic: false,
      latin: false,
      translation: false
    })
  }

  function changeNoRepeat() {
    setNoRepeat(prev => !prev)
    resetState()
  }

  function nextSurah() {
    chooseSurah(Number(chosenSurah) + 1)
  }

  return (
    <>
      <Header
        language={language}
        showOptions={() => setShowOptions(prev => !prev)}
      />
      <main>
        {allQuranData &&
          <InputSection
            data={allQuranData}
            changeSurah={(e) => chooseSurah(e.currentTarget.value)}
            surah={surahData}
            firstNumber={(e) => chooseFirstNumber(e.currentTarget.value)}
            secondNumber={(e) => chooseSecondNumber(e.currentTarget.value)}
            generate={nextNumber}
            repeat={changeNoRepeat}
            showNextSurahBtn={showNextSurahButton}
            numberList={numberList}
            first={firstNumber}
            second={secondNumber}
            reset={resetState}
            language={language}
            nextSurah={nextSurah}
            chosenSurah={chosenSurah}
            showNextSurahBtn={showNextSurahButton}
          />}
        <DisplaySection
          language={language}
          currentNumber={currentNumber}
          numberList={numberList}
          detailShowed={detailShowed}
          setDetailShowed={setDetailShowed}
          setCurrentNumber={setCurrentNumber}
          totalLength={generatedList.length}
          noRepeat={noRepeat}
        />
        <DetailSection
          surah={surahData}
          currentNumber={currentNumber}
          language={language}
          detailShowed={detailShowed}
          setDetailShowed={setDetailShowed}
        />
        {showOptions && <Options
          language={language}
          changeLanguage={(e) => setLanguage(e.currentTarget.value)}
          close={() => setShowOptions(false)} />}
        {message && <p className="message">{message}</p>}
      </main >
    </>
  )
}

export default App

