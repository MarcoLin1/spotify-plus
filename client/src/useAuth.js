import { useEffect, useState } from "react"
import axios from 'axios'

export default function useAuth (code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    async function fetchLoginToken () {
      try {
        const { data } = await axios.post('http://localhost:3001/login', {
          code
        })
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setExpiresIn(data.expiresIn)
        window.history.pushState({}, null, '/')
      } catch (error) {
        console.log('login token failed')
        window.location = '/'
      }
    }
    fetchLoginToken()

  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return 
    }
    const interval = setInterval(() => {
      axios.post('http://localhost:3001/refresh', {
        refreshToken
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
      })
      .catch(() => {
        console.log('refresh error')
        window.location = '/'
      })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}