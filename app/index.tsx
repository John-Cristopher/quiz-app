import React, { useState } from 'react'
import HomeScreen from '../components/HomeScreen'
import QuizScreen from '../components/QuizScreen'

export default function Index () {
  const [isPlaying, setIsPlaying] = useState(false)
  const [achievementsVisible, setAchievementsVisible] = useState(false)

  if (isPlaying) {
    return <QuizScreen />
  }

  return (
    <>
      <HomeScreen
        onStartQuiz={() => setIsPlaying(true)}
        onOpenAchievements={() => setAchievementsVisible(true)}
      />
    </>
  )
}
