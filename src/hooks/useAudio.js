import { useContext } from "react"
import { AudioContext } from "../container/Layout/Components/AudioElement/AudioProvider"

const useAudio = () => {
    const { audioRef } = useContext(AudioContext)
    return audioRef
}

export default useAudio;