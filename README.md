# 🧀 Nome do Projeto: QUEEZE

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**Descrição:**
O **QUEEZE** ("O quiz mais coalhado da rede") é um aplicativo mobile de perguntas e respostas interativo e dinâmico. O app oferece uma experiência divertida com efeitos sonoros personalizados, seleção aleatória de perguntas e um recurso especial chamado _Cheese of Truth_ (Queijo da Verdade).

---

## 📽️ Demonstração (GIF do Uso)

<div align="center">
  <!-- Substitua o link abaixo pelo caminho relativo ou URL do seu GIF -->
  <img src="./assets/demo.gif" alt="Demonstração do App QuEEZE" width="300" />
  <p><i>Demonstração do fluxo de perguntas, efeitos sonoros e modal no QuEEZE.</i></p>
</div>

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Autores](#-autores)
- [Licença](#-licença)

---

## ✨ Funcionalidades

- **Perguntas Aleatórias:** Seleção automatizada de 7 perguntas por partida via algoritmo _Fisher-Yates_.
- **Opções Embaralhadas:** A cada nova rodada, a ordem das respostas é totalmente dinamizada.
- **Feedback Sonoro:**
  - 🧀 Som de mordida crocante ao acertar uma resposta.
  - ❌ Som de erro ao selecionar a opção incorreta.
  - 🔊 Som de pop nas navegações e interações.
- **Modal "Verdade" (Cheese of Truth):** Recurso interativo para auxílio/curiosidades durante o quiz.
- **Tela de Resultados:** Apresentação do desempenho final com opção de reiniciar o quiz.
- **Interface Responsiva & Temática:** Design estilizado em tons de queijo com status visual instantâneo para respostas certas ou erradas.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem / Frameworks:**
  - [React Native](https://reactnative.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Expo](https://expo.dev/)
- **Componentes & Hooks Internos:**
  - `useSound` (Hook customizado para execução de efeitos sonoros)
  - `CheeseOfTruthModal` & `ResultScreen`
  - `SafeAreaView`, `StatusBar`, `TouchableOpacity`, `StyleSheet`


## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/queeze.git](https://github.com/seu-usuario/queeze.git)
   cd queeze
   ```
   Instale as dependências:

```bash
npm install
# ou
yarn install
```

Inicie o servidor de desenvolvimento do Expo:

Bash
npx expo start
Execute no dispositivo/emulador:

Use a câmera do celular para ler o QR Code no app Expo Go (Android/iOS).

## 👤 Autores

John Cristopher

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.
