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
  const [chosenSurah, setChosenSurah] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentNumber, setCurrentNumber] = useState(null)
  const [numberList, setNumberList] = useState([])
  const [message, setMessage] = useState("")
  const [showArabic, setShowArabic] = useState(false)
  const [showLatin, setShowLatin] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [firstNumber, setFirstNumber] = useState(1)
  const [secondNumber, setSecondNumber] = useState(1)
  const [noRepeat, setNoRepeat] = useState(true)
  const listEndRef = useRef(null)
  const arabicStartRef = useRef(null)
  const latinStartRef = useRef(null)
  const translationStartRef = useRef(null)
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

  useEffect(() => {
    if (numberList.length) {
      listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [numberList])

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
    setShowArabic(false)
    setShowLatin(false)
    setShowTranslation(false)
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
      }
    }
    setShowArabic(false)
    setShowLatin(false)
    setShowTranslation(false)
  }

  function toggleShowArabic() {
    setShowArabic(prev => !prev)
  }

  function toggleShowLatin() {
    setShowLatin(prev => !prev)
  }

  function toggleShowTranslation() {
    setShowTranslation(prev => !prev)
  }

  function toggleShowAll() {
    if (showArabic || showLatin || showTranslation) {
      setShowArabic(false)
      setShowLatin(false)
      setShowTranslation(false)
    } else {
      setShowArabic(true)
      setShowLatin(true)
      setShowTranslation(true)
    }
  }

  function showListDetail(id) {
    if (id === currentNumber && showArabic && showLatin && showTranslation) {
      setShowArabic(false)
      setShowLatin(false)
      setShowTranslation(false)
    } else if (id === currentNumber && !showArabic && !showLatin && !showTranslation) {
      setShowArabic(true)
      setShowLatin(true)
      setShowTranslation(true)
    } else {
      setCurrentNumber(id)
      setShowArabic(true)
      setShowLatin(true)
      setShowTranslation(true)
    }
  }

  function changeNoRepeat() {
    setNoRepeat(prev => !prev)
    resetState()
  }

  return (
    <>
      <Header
        language={language}
        showOptions={() => setShowOptions(prev => !prev)}
      />
      <main>
        {allQuranData && <InputSection
          data={allQuranData}
          changeSurah={(e) => chooseSurah(e.currentTarget.value)}
          surah={surahData}
          firstNumber={(e) => chooseFirstNumber(e.currentTarget.value)}
          secondNumber={(e) => chooseSecondNumber(e.currentTarget.value)}
          generate={nextNumber}
          repeat={changeNoRepeat}
          numberList={numberList}
          first={firstNumber}
          second={secondNumber}
          reset={resetState}
          language={language}
        />}
        <DisplaySection
          language={language}
          message={message}
          mainNumber={currentNumber}
          listEnd={listEndRef}
          numberList={numberList}
          showDetail={(e) => showListDetail(Number(e.currentTarget.textContent))} />
        <DetailSection
          surah={surahData}
          number={currentNumber}
          toggleArabic={toggleShowArabic}
          toggleLatin={toggleShowLatin}
          toggleTranslation={toggleShowTranslation}
          toggleAll={toggleShowAll}
          showArabic={showArabic}
          showLatin={showLatin}
          showTranslation={showTranslation}
          language={language}
          arabicStart={arabicStartRef}
          latinStart={latinStartRef}
          translationStart={translationStartRef} />
        {showOptions && <Options
          language={language}
          changeLanguage={(e) => setLanguage(e.currentTarget.value)}
          close={() => setShowOptions(false)} />}
      </main >
    </>
  )
}

export default App

