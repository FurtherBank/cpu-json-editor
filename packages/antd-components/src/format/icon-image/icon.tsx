import React, { ImgHTMLAttributes, useEffect } from 'react'

const ImageComponent = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  const { src = '', style = {}, ...restProps } = props
  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      const aspectRatio = image.width / image.height

      if (image.width > image.height) {
        setWidth(32)
        setHeight(32 / aspectRatio)
      } else {
        setWidth(32 * aspectRatio)
        setHeight(32)
      }
    }
  }, [src])

  return (
    <img
      src={src}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...style
      }}
      {...restProps}
    />
  )
}

export default ImageComponent
