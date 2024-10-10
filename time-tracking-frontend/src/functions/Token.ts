import CryptoJS from "crypto-js"

export function getAuthToken() {
  const encryptedToken = localStorage.getItem('authToken') as string
  const bytes = CryptoJS.AES.decrypt(encryptedToken, import.meta.env.VITE_REACT_APP_KEY)
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)

  return decryptedToken
}
