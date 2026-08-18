import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

type ResultScreenProps = {
  score: number
  totalQuestions: number
  onPlayAgain: () => void
}

export default function ResultScreen ({
  score,
  totalQuestions,
  onPlayAgain
}: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getBadgeAndEmoji = () => {
    if (percentage >= 70) return { emoji: '👑', badge: 'Mestre Queijueiro!' }
    if (percentage >= 50) return { emoji: '🧀', badge: 'Apreciador de Gouda' }
    return { emoji: '🥛', badge: 'Leite Coalhado' }
  }

  const { emoji, badge } = getBadgeAndEmoji()

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFF8E7' />
      <View style={[styles.container, styles.resultContainer]}>
        <Text style={styles.resultTitle}>Fim do QuEEZE! 🧀</Text>

        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultBadge}>{badge}</Text>
          <Text style={styles.resultScoreText}>
            Você acertou{' '}
            <Text style={styles.resultScoreHighlight}>{score}</Text> de{' '}
            {totalQuestions} perguntas!
          </Text>
          <Text style={styles.resultPercentage}>
            {percentage}% de aproveitamento
          </Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPlayAgain}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>Jogar Novamente</Text>
        </TouchableOpacity>
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
    paddingBottom: 24
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 24
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4A2E10',
    textAlign: 'center'
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFE082',
    elevation: 4,
    shadowColor: '#4A2E10',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 12
  },
  resultBadge: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E67E22',
    marginBottom: 16
  },
  resultScoreText: {
    fontSize: 16,
    color: '#4A2E10',
    textAlign: 'center',
    marginBottom: 8
  },
  resultScoreHighlight: {
    fontWeight: 'bold',
    color: '#E67E22'
  },
  resultPercentage: {
    fontSize: 14,
    color: '#8C6D46',
    fontWeight: '600'
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
