import { Button } from '@chakra-ui/react'
import { useRef, useCallback } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

export function Camera() {
  const webcamRef = useRef<Webcam>(null)

  // Función para capturar la foto
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      console.log('Foto tomada:', imageSrc)
    }
  }, [webcamRef])

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <Button onClick={capture} colorScheme="blue">
        Tomar Foto
      </Button>
    </div>
  )
}
