const GOOGLE_API_KEY = 'AIzaSyBdqPHcpShr--0TyT6vPEapobGVMPsO_q0'
const TOKEN_LOCATIONIQ = 'pk.ce25c59f14c75ec52af30206ebd3e239'

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  
  return imagePreviewUrl;
}


export async function getAddress(lat, lng) {
  
  const url = `https://us1.locationiq.com/v1/reverse?key=${TOKEN_LOCATIONIQ}&lat=${lat}&lon=${lng}&format=json&`
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!')
  }
 
  const data = await response.json()
  const address = data.display_name

  return address;
}