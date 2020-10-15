export const getService = async (host) => { 
  const response = await fetch(host)
  return response.json()
}