export const useCover = () => (defaultI, track, size) => {
    defaultImg = defaultI[size]['#text']
    if (track) {
        const { album } = track
        if (album) {
            const { image } = album
            if (image) {
                const myImg = image[size]['#text']
                return myImg
            } else {
                return defaultImg
            } 
        } else {
            return defaultImg
        }
    } else {
        return defaultImg
    }
}