import { useState, useEffect, ReactElement } from 'react'
import { withRouter } from 'react-router-dom'
import { getUrlData } from 'zzy-javascript-devtools'

import './index.css'


interface IBasicM {
  token: string
  appType: string
  top?: string | number
}


function Page(): ReactElement {
  const [basicMsg, setBasicMsg] = useState<IBasicM>({ token: '', appType: process.env.DOMAIN === '' ? '' : '', top: 0 })
  useEffect(() => {
    const url: string = window.location.href
    const { token, top = 0 } = getUrlData(url)
    const rem: string = document.querySelector('html')?.style.fontSize.split('px')[0] || '0'
    const remTop: string = (top / +rem).toFixed(3)
    setBasicMsg(d => ({ ...d, token, top: remTop }))
  }, [])

  const [pageData, setPageData] = useState<object>({})
  useEffect(() => {
  }, [])

  return <div id="homePage_wrap">hello,zzy</div>
}

export default withRouter(Page)
