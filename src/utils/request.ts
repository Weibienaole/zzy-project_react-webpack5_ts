import axios from 'axios'
import { Toast } from 'antd-mobile'

/**
 * url - 接口名称
 * data - 数据组
 * token - 用户信息
 * type - 域名类型(区分多个不同的域名)
 */
interface IRequestObj {
  url: string
  data?: object
  token?: string
  type?: number
}

interface IAxiosReturnD {
  data: {
    code: number
    body: object
    msg: string
  }
}

function request({
  url,
  data = {},
  token = '',
  type = 0
}: IRequestObj): Promise<object> {
  Toast.loading('加载中...', 30, () => {
    Toast.hide()
    Toast.fail('加载失败，请重试', 2)
    return
  })
  // getDomain - .${process.env.DOMAIN} - 如果统一域名用后者，删除函数内的domain，反之当前
  const u: string = `https://${
    process.env.NODE_ENV === 'development' ? 'test' : ''
  }${getDomain(type)}.com/${url}?token=${token}`
  return new Promise((reslove, reject): void => {
    axios
      .post(u, { ...data })
      .then(function (res: IAxiosReturnD) {
        if (res.data.code === 0) {
          Toast.hide()
          process.env.NODE_ENV === 'development' &&
            console.log(JSON.stringify(res.data.body))
          reslove(res.data.body)
        } else {
          Toast.hide()
          Toast.offline(res.data.msg, 5)
          reject(res)
        }
      })
      .catch(function (err) {
        Toast.hide()
        Toast.fail(err.msg || '加载失败，请重试', 5)
        reject(err)
      })
  })
}

function formDataRequest({
  url,
  data = {},
  token = '',
  type = 0
}: IRequestObj): Promise<object> {
  Toast.loading('加载中...', 30, () => {
    Toast.hide()
    Toast.fail('加载失败，请重试', 2)
    return
  })

  const u: string = `https://${
    process.env.NODE_ENV === 'development' ? 'test' : ''
  }${getDomain(type)}.com/${url}?token=${token}`
  const formData: FormData = new FormData()
  for (let i in data) {
    formData.append(i, data[i])
  }

  return new Promise((reslove, reject): void => {
    axios
      .post(u, formData)
      .then(function (res: IAxiosReturnD) {
        if (res.data.code === 0) {
          Toast.hide()
          console.log(JSON.stringify(res.data.body))
          reslove(res.data.body)
        } else {
          Toast.hide()
          Toast.offline(res.data.msg, 5)
          reject(res)
        }
      })
      .catch(function (err) {
        Toast.hide()
        Toast.fail(err.msg || '加载失败，请重试', 5)
        reject(err)
      })
  })
}

function getDomain(t: number): string {
  let domain: string = ''
  switch (t) {
    case 0:
      domain = `count`
      break
    default:
      domain = ``
  }
  return domain
}
export { request, formDataRequest }
