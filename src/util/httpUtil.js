export const getService = async (host) => { 
  try {
    const response = await fetch(host).then(response => response.json())
    return response
  } catch (error) {
    return null
  }
}