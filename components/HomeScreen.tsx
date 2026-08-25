import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useSound } from '../hooks/useSound'

type HomeScreenProps = {
  onStartQuiz: () => void
  onOpenAchievements?: () => void
}

export default function HomeScreen ({
  onStartQuiz,
  onOpenAchievements
}: HomeScreenProps) {
  const { playSound } = useSound()

  const handleStart = () => {
    playSound('pop')
    onStartQuiz()
  }

  const handleAchievements = () => {
    playSound('pop')
    onOpenAchievements?.()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFF8E7' />
      <View style={styles.container}>
        {/* HERO / LOGO */}
        <View style={styles.heroSection}>
          <Text style={styles.mainEmoji}>🧀</Text>
          <Text style={styles.title}>
            Qu<Text style={styles.titleHighlight}>EEZE</Text>
          </Text>
          <Text style={styles.tagline}>
            O quiz mais coalhado e divertido da rede!
          </Text>
        </View>

        {/* CARD INFORMATIVO / DESTAQUE */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Pronto para o desafio?</Text>
          <Text style={styles.infoText}>
            Responda 7 perguntas aleatórias e descubra se você é um Mestre
            Queijueiro ou apenas Leite Coalhado!
          </Text>
        </View>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>▶ Começar Quiz</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 20
  },
  mainEmoji: {
    fontSize: 80,
    marginBottom: 8
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#4A2E10',
    letterSpacing: 1
  },
  titleHighlight: {
    color: '#E67E22'
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8C6D46',
    textAlign: 'center',
    marginTop: 6
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#FFE082',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4A2E10',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E67E22',
    marginBottom: 8
  },
  infoText: {
    fontSize: 14,
    color: '#4A2E10',
    textAlign: 'center',
    lineHeight: 20
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 10
  },
  primaryButton: {
    backgroundColor: '#E67E22',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  secondaryButton: {
    backgroundColor: '#FFE082',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFB300'
  },
  secondaryButtonText: {
    color: '#4A2E10',
    fontSize: 15,
    fontWeight: '800'
  }
})
