import { useAudioPlayer } from "expo-audio";

// Mapeamento dos arquivos de áudio
const SOUND_SOURCES = {
    bite: require("../assets/sounds/bite.mp3"),
    wrong: require("../assets/sounds/wrong.mp3"),
    pop: require("../assets/sounds/pop.mp3"),
};

export type SoundEffect = keyof typeof SOUND_SOURCES;

export function useSound() {
    const bitePlayer = useAudioPlayer(SOUND_SOURCES.bite);
    const wrongPlayer = useAudioPlayer(SOUND_SOURCES.wrong);
    const popPlayer = useAudioPlayer(SOUND_SOURCES.pop);

    const playSound = (effect: SoundEffect) => {
        let player;

        switch (effect) {
            case "bite":
                player = bitePlayer;
                break;
            case "wrong":
                player = wrongPlayer;
                break;
            case "pop":
                player = popPlayer;
                break;
        }

        if (player) {
            player.seekTo(0);
            player.play();
        }
    };

    return { playSound };
}
