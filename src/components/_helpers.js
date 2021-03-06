"use strict"

export const foundEnvironmentVolume = (framesRendered) => {
  if (framesRendered >= 3) {
    return true
  } else {
    return false
  }
}

export const getEnvironmentVolume = (frequencyData) => {
  let envVolume = 0

  for (let i = 6; i < 18; i++) {
    envVolume += frequencyData[i]
  }

  if (envVolume <= 0) {
    return false
  } else {
    return envVolume
  }
}

export const getAnimationFrame = (frequencyData, envVolume) => {
  let width = 40
  let height = 5
  let eyebrowHeight = 0
  let borderRadius = 50
  let volume = 0
  let pitch = 0
  let purity = 0

  for (let i = 6; i < 18; i++) {
    volume += frequencyData[i]
    if (i == 6 || frequencyData[i] > frequencyData[i-1]) {
      pitch = i
    }
  }

  purity = frequencyData[pitch] / volume
  console.log(purity)

  let trueVolume = volume - envVolume
  if (trueVolume > 100) {

    let excess = trueVolume - 100
    let excessCorrected = 0
    for (let i = 1; i <= excess; i++) {
      excessCorrected+= 0.2 + (1 / i)
    }
    trueVolume = 100 + excessCorrected

    height = 5 + Math.round(trueVolume / 30)
    width = 50 + Math.round(trueVolume / 30) - (pitch * 1.5) - (purity * 80)
    borderRadius = Math.round(pitch * 4) + Math.round(trueVolume / 300)
    eyebrowHeight = 1 + Math.ceil(trueVolume / 50)
    // console.log(borderRadius)

    if (height >= 20) {
      height = 20
    }

    if (width >= 50) {
      width = 50
    } else if (width <= 15) {
      width = 15
    }
  }

  return ({
    height: height,
    width: width,
    borderRadius: borderRadius,
    eyebrowHeight: eyebrowHeight
  })

}
