import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Bird from './src/components/Bird';
import Obstacles from './src/components/obstacles';

export default function App() {

  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);

  const gravity = 3;
  let gameTimerId;

  const obsticaleWidth = 60;
  const obsticaleHeight = 300;
  const gap = 200;
  const [obsticalLeft, setObsticalLeft] = useState(screenWidth);
  const [obsticaleNegHeight, setObsticaleHeight] = useState(0);
  let obsticalTimerId;

  const [obsticalelefttwo, setObsticalLeftTwo] = useState(screenWidth + screenWidth / 2 + obsticaleWidth);
  const [obsticaleNegHeightTwo, setObsticaleHeightTwo] = useState(0);
  let obsticalTimerIdTwo;

  useEffect(() => {
    if (obsticalLeft > -obsticaleWidth) {
      obsticalTimerId = setInterval(() => {
        setObsticalLeft((obsticalLeft) => obsticalLeft - 5);
      }, 30);
      return () => {
        clearInterval(obsticalTimerId);
      };
    } else {
      setObsticalLeft(screenWidth);
      setObsticaleHeight(-Math.random() * 100);
    }
  }, [obsticalLeft]);

  useEffect(() => {
    if (obsticalelefttwo > -obsticaleWidth) {
      obsticalTimerIdTwo = setInterval(() => {
        setObsticalLeftTwo((left) => left - 5);
      }, 30);
      return () => clearInterval(obsticalTimerIdTwo);
    } else {
      setObsticalLeftTwo(screenWidth);
      setObsticaleHeightTwo(-Math.random() * 100);
    }
  }, [obsticalelefttwo]);

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  return (
    <View style={styles.container}>
      <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
      <Obstacles
        color={'green'}
        obsticaleWidth={obsticaleWidth}
        obsticaleHeight={obsticaleHeight}
        gap={gap}
        obsticalBottom={obsticaleNegHeight}
        obsticalLeft={obsticalLeft}
      />

      <Obstacles
        color={'yellow'}
        obsticaleWidth={obsticaleWidth}
        obsticaleHeight={obsticaleHeight}
        gap={gap}
        obsticalLeft={obsticalelefttwo}
        obsticalBottom={obsticaleNegHeightTwo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
