export function selectImageByType(images, _type) {
  const found = images.filter((item) => item._type === _type)

  return found[0]
}

export function getImageURLCommon(url, width, height, fit, gravity) {
  if (!width && !height) {
    //console.log('getImageURLCommon() no width no height')
    return ''
  }

  if (!url.endsWith('/')) {
    url = `${url}/`
  }

  if (!fit) {
    fit = 'contain'
  }
  let params = ''
  const options = {}

  if (width) {
    options.width = width
  }

  if (height) {
    options.height = height
  }

  if (fit) {
    options.fit = fit
  }

  if (gravity) {
    options.gravity = gravity
  }
  //console.log('options are')
  //console.log(options)

  Object.entries(options).map((obj) => {
    const key = obj[0]
    const value = obj[1]

    params += `${key}=${value},`
  })

  params = params.slice(0, -1)
  //console.log('params is')
  //console.log(params)

  const fullUrl = `${url}${params}`

  //console.log(`getImageURLCommon returns url: ${fullUrl}`)

  return fullUrl
} /// getImageURLCommon

export function getImageURLByWidth(url, width, fit) {
  return getImageURLCommon(url, width, 0, fit)
}

export function getImageURLByHeight(url, height, fit) {
  return getImageURLCommon(url, 0, height, fit)
}
