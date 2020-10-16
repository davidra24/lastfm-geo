export const secondsToMinutes = (duration) => {
    const minutes = Math.floor(duration / 60)
    let seconds = duration - minutes * 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
}

export const CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert("You are online!");
        } else {
          Alert.alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };