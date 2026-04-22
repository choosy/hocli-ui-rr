import { Link } from 'react-router'
import { useEffect, useRef } from 'react'

import { useGalleryStore } from 'app/lib/galleryStore'
import {
  selectImageByType,
  getImageURLByWidth,
  getImageURLCommon,
} from 'app/lib/images'
import { useContainerDimensions } from 'app/lib/util_hooks'

export function ImagesDetail({ product, images, ...props }) {
  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)

  const {
    initGallery,
    setFocusedImage,
    getFocusedImage,
    getUnfocusedImages,
    getGalleryInfo,
  } = useGalleryStore()

  // Initialize gallery only once when component mounts or when product/images change
  useEffect(() => {
    if (product?.id && images?.length) {
      initGallery(product.id, images)

      // Set default focused image if needed
      const galleryInfo = getGalleryInfo(product.id)
      if (galleryInfo && galleryInfo.currentIndex === 0) {
        const artwork = selectImageByType(images, 'artwork')
        if (artwork) {
          setFocusedImage(product.id, artwork.id)
        }
      }
    }
  }, [product?.id, images]) // Dependencies ensure this runs only when needed

  function handleImageFocus(e, imageId) {
    e.preventDefault()
    setFocusedImage(product.id, imageId)
  }

  const focusedImage = getFocusedImage(product.id)
  const unfocusedImages = getUnfocusedImages(product.id)

  return (
    <div ref={componentRef} className="flex-none w-[60%] border border-red-500">
      {images && focusedImage && width > 0 && (
        <div className="flex">
          <div className="w-[150px] border border-yellow-500">
            {unfocusedImages.map((image) => (
              <Link
                key={image.id}
                to="#"
                onClick={(e) => handleImageFocus(e, image.id)}
              >
                <img
                  alt={image.alt || ''}
                  src={getImageURLCommon(image.url, 150, 150, 'crop', 'auto')}
                />
              </Link>
            ))}
          </div>
          <div className="border border-green-500">
            <img
              src={getImageURLByWidth(focusedImage.url, width)}
              alt={focusedImage.alt || ''}
            />
          </div>
        </div>
      )}
    </div>
  )
}
