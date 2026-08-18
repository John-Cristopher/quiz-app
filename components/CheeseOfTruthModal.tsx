import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native'

import localFacts from '../(data)/facts.json'

interface CheeseOfTruthModalProps {
  visible: boolean
  onClose: () => void
}

export default function CheeseOfTruthModal ({
  visible,
  onClose
}: CheeseOfTruthModalProps) {
  const [truth, setTruth] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCooldown, setIsCooldown] = useState(false)

  const handleFetchTruth = () => {
    if (!localFacts || localFacts.length === 0 || isCooldown || isLoading)
      return

    setIsLoading(true)
    setIsCooldown(true)

    // Simula um tempo de "revelação" para dar drama e aplica o cooldown
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * localFacts.length)
      setTruth(localFacts[randomIndex])
      setIsLoading(false)
    }, 700) // Delay de 600ms para revelar a frase

    // Libera o botão após 1.8 segundos
    setTimeout(() => {
      setIsCooldown(false)
    }, 1300)
  }

  // Reseta o estado quando o modal fecha
  const handleClose = () => {
    setTruth('')
    setIsLoading(false)
    setIsCooldown(false)
    onClose()
  }

  return (
    <Modal
      visible={visible}
      animationType='fade'
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>O Queijo da Verdade</Text>
          <Text style={styles.subtitle}>
            Toque no queijo para revelar sua profecia
          </Text>

          {/* Botão do Queijo com visual de desabilitado durante o cooldown */}
          <TouchableOpacity
            style={[
              styles.cheeseButton,
              (isCooldown || isLoading) && styles.cheeseButtonDisabled
            ]}
            onPress={handleFetchTruth}
            activeOpacity={0.7}
            disabled={isCooldown || isLoading}
          >
            <Text style={[styles.cheeseEmoji, isCooldown && { opacity: 0.5 }]}>
              🧀
            </Text>
          </TouchableOpacity>

          {/* Área de Exibição da Frase */}
          <View style={styles.textContainer}>
            {isLoading ? (
              <ActivityIndicator color='#E67E22' size='large' />
            ) : (
              <Text style={styles.truthText}>
                {truth || 'Toque no queijo acima para receber a revelação!'}
              </Text>
            )}
          </View>

          {/* Indicador discreto de tempo / status */}
          <Text style={styles.cooldownHint}>
            {isCooldown ? 'Aguarde o queijo maturar...' : ' '}
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#FFF8E7',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFE082',
    elevation: 5,
    shadowColor: '#4A2E10',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4A2E10'
  },
  subtitle: {
    fontSize: 13,
    color: '#8C6D46',
    marginVertical: 6
  },
  cheeseButton: {
    marginVertical: 16,
    backgroundColor: '#FFE082',
    padding: 20,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#FFB300',
    elevation: 2
  },
  cheeseButtonDisabled: {
    backgroundColor: '#F0E3CE',
    borderColor: '#D7CCC8',
    elevation: 0
  },
  cheeseEmoji: {
    fontSize: 56
  },
  textContainer: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 12
  },
  truthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1D11',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22
  },
  cooldownHint: {
    fontSize: 11,
    color: '#8C6D46',
    fontWeight: '600',
    height: 16,
    marginBottom: 8
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: '#4A2E10',
    borderRadius: 12
  },
  closeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14
  }
})
