/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native';

import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType
} from "react-native-sensors";

function App(): React.JSX.Element {
  // temps
  const [enPause, setEnPause] = useState<boolean>(false)
  const [secondes, setSecondes] = useState(0);
  // sensor
  const [x, setX] = useState(0);

  setUpdateIntervalForType(SensorTypes.gyroscope, 1000);

  const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
    setX(x)
  });
  
  // Démarrer le timer si on est en pause
  const demarrerTimer = () => {
    if(enPause){
      setEnPause(false)
    }
  }

  // Ajouter une seconde si on est pas en pause
  const augmenterTemps = () => {
    if(!enPause){
      setSecondes(secondes + 1)
    }
  }

  // Arrêter le timer si on est pas en pause
  const arreterTimer = () => {
    if(!enPause){
      setEnPause(true)
    }
  }

  // Ajouter une seconde à chaque seconde
  useEffect(() => {
    if(!enPause){
      setTimeout(() => {
        augmenterTemps()
      }, 1000)
    }
  }, [secondes, enPause])

  // Détecter le yaw
  useEffect(() => {
    if(x < 0){
      setEnPause(true);
    } else if (x >= 0){
      setEnPause(false);
    }
  }, [x])

  return (
    <>
    <Text>{secondes}</Text>
    <Button title={ enPause ? "Démarrer" : "Arrêter" } onPress={ () => enPause ? demarrerTimer() : arreterTimer() }/>
    </>
  );
}

export default App;
