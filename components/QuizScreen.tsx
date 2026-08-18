import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import questionsData from '../(data)/questions.json'
import CheeseOfTruthModal from './CheeseOfTruthModal'
import ResultScreen from './ResultScreen'
import { useSound } from '../hooks/useSound'

// Algoritmo Fisher-Yates para embaralhar o array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Seleciona 7 questões aleatórias
const selectRandomQuestions = (
  questions: typeof questionsData,
  limit: number = 7
) => {
  const shuffled = shuffleArray(questions)
  return shuffled.slice(0, Math.min(limit, shuffled.length))
}

// Embaralha as alternativas de cada questão
const shuffleQuestionOptions = (question: typeof questionsData[0]) => {
  return {
    ...question,
    options: shuffleArray(question.options)
  }
}

export default function QuizScreen() {
  const [quizQuestions, setQuizQuestions] = useState<typeof questionsData>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const { playSound } = useSound()

  useEffect(() => {
    initQuiz()
  }, [])

  const initQuiz = () => {
    const selectedQuestions = selectRandomQuestions(questionsData, 7)
    const questionsWithShuffledOptions = selectedQuestions.map(
      shuffleQuestionOptions
    )
    setQuizQuestions(questionsWithShuffledOptions)
  }

  const currentQuestion = quizQuestions[currentIndex]
  const totalQuestions = quizQuestions.length

  const handleSelectOption = (option: string) => {
    if (isAnswered) return

    setSelectedOption(option)
    setIsAnswered(true)

    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1)
      playSound('bite') // 🧀 Som de mordida crocante!
    } else {
      playSound('wrong') // ❌ Som de erro
    }
  }

  const handleNextQuestion = () => {
    playSound('pop')
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    playSound('pop')
    initQuiz()
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setIsFinished(false)
  }

  const handleOpenModal = () => {
    playSound('pop')
    setModalVisible(true)
  }

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return { buttonStyle: styles.optionButton, textStyle: styles.optionText }
    }

    const isCorrect = option === currentQuestion.correctAnswer
    const isSelected = option === selectedOption

    if (isCorrect) {
      return {
        buttonStyle: [styles.optionButton, styles.correctOption],
        textStyle: [styles.optionText, styles.correctOptionText]
      }
    }

    if (isSelected && !isCorrect) {
      return {
        buttonStyle: [styles.optionButton, styles.wrongOption],
        textStyle: [styles.optionText, styles.wrongOptionText]
      }
    }

    return {
      buttonStyle: [styles.optionButton, styles.disabledOption],
      textStyle: styles.disabledOptionText
    }
  }

  // Se o quiz tiver terminado, abre o componente de resultados
  if (isFinished) {
    return (
      <ResultScreen
        score={score}
        totalQuestions={totalQuestions}
        onPlayAgain={handleRestart}
      />
    )
  }

  // Se as questões ainda não carregaram
  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF8E7" />
        <View style={styles.container} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E7" />
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>
              Qu<Text style={styles.logoHighlight}>EEZE</Text> 🧀
            </Text>
            <Text style={styles.tagline}>O quiz mais coalhado da rede</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.truthButton}
              onPress={handleOpenModal}
              activeOpacity={0.7}
            >
              <Text style={styles.truthButtonText}>🔮 Verdade</Text>
            </TouchableOpacity>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {currentIndex + 1}/{totalQuestions}
              </Text>
            </View>
          </View>
        </View>

        {/* CARD DA PERGUNTA */}
        <View style={styles.questionCard}>
          <Text style={styles.questionCategory}>
            Pergunta #{currentIndex + 1}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        {/* LISTA DE ALTERNATIVAS */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index)
            const { buttonStyle, textStyle } = getOptionStyle(option)

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                disabled={isAnswered}
                onPress={() => handleSelectOption(option)}
                style={buttonStyle}
              >
                <View style={styles.letterBadge}>
                  <Text style={styles.letterText}>{letter}</Text>
                </View>
                <Text style={textStyle}>{option}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* BOTÃO PRÓXIMA PERGUNTA */}
        {isAnswered ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNextQuestion}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              {currentIndex + 1 === totalQuestions
                ? 'Ver Resultado'
                : 'Próxima Pergunta ➔'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 52 }} />
        )}

        {/* MODAL CHEESE OF TRUTH */}
        <CheeseOfTruthModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8E7'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4A2E10',
    letterSpacing: 0.5
  },
  logoHighlight: {
    color: '#E67E22'
  },
  tagline: {
    fontSize: 12,
    color: '#8C6D46',
    fontWeight: '600'
  },
  truthButton: {
    backgroundColor: '#FFE082',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FFB300'
  },
  truthButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4A2E10'
  },
  badge: {
    backgroundColor: '#FFE082',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FFB300'
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A2E10'
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    minHeight: 160,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFE082',
    elevation: 3,
    shadowColor: '#4A2E10',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  questionCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E67E22',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1
  },
  questionText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2C1D11',
    lineHeight: 26
  },
  optionsContainer: {
    gap: 10
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F0E3CE',
    elevation: 1
  },
  letterBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  letterText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E67E22'
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A2E10',
    flex: 1
  },
  correctOption: {
    backgroundColor: '#E8F8F5',
    borderColor: '#2ECC71'
  },
  correctOptionText: {
    color: '#1E8449',
    fontWeight: '700'
  },
  wrongOption: {
    backgroundColor: '#FDEDEC',
    borderColor: '#E74C3C'
  },
  wrongOptionText: {
    color: '#922B21',
    fontWeight: '700'
  },
  disabledOption: {
    opacity: 0.5
  },
  disabledOptionText: {
    color: '#7F8C8D'
  },
  actionButton: {
    backgroundColor: '#E67E22',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
})