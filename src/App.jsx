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
  const [generatedList, setGeneratedList] = useState([])
  const [numberList, setNumberList] = useState([])
  const [message, setMessage] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [showNextSurahButton, setShowNextSurahButton] = useState(false)
  const [noRepeat, setNoRepeat] = useState(true)
  const [detailShowed, setDetailShowed] = useState({ arabic: false, latin: false, translation: false })
  const text = elements[language]

  useEffect(() => {
    if (language === "english") {
      fetch("https://equran.id/api/en/surah")
        .then(res => res.json())
        .then(data => {
          const numberAndTitle = []
          data.data.forEach(surah =>
            numberAndTitle.push({
              'number': surah.number,
              'title': surah.englishName
            }))
          setAllQuranData(numberAndTitle)
        })
    } else if (language === "indonesia") {
      fetch("https://equran.id/api/v2/surat")
        .then(res => res.json())
        .then(data => {
          const numberAndTitle = []
          data.data.forEach(surah =>
            numberAndTitle.push({
              'number': surah.nomor,
              'title': surah.namaLatin
            }))
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
                'ayahTranslation': ayah.textEnglish,
                'ayahAudio': ayah.audio['05']
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
                'ayahTranslation': ayah.teksIndonesia,
                'ayahAudio': ayah.audio['05']
              })
            })
            detailSurah['title'] = data.data.namaLatin
            detailSurah['titleTranslation'] = data.data.arti
            detailSurah['number'] = data.data.nomor
            detailSurah['ayahs'] = detailAyah
            setSurahData(detailSurah)
          })
    }
    resetState()
  }, [chosenSurah, language])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [message])

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

  function test() {
    console.log(generatedList)
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
            surahData={surahData}
            nextNumber={nextNumber}
            setNoRepeat={setNoRepeat}
            numberList={numberList}
            setGeneratedList={setGeneratedList}
            resetState={resetState}
            language={language}
            chosenSurah={chosenSurah}
            setChosenSurah={setChosenSurah}
            showNextSurahButton={showNextSurahButton}
            setShowNextSurahButton={setShowNextSurahButton}
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
          surahData={surahData}
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
      <button onClick={test}>test</button>
    </>
  )
}

export default App

