import { create } from 'zustand'
import { produce } from 'immer'

export const useGalleryStore = create((set, get) => ({
  galleries: {},

  initGallery: (productId, images) =>
    set(
      produce((state) => {
        // Only initialize if it doesn't exist already
        if (!state.galleries[productId]) {
          state.galleries[productId] = {
            images, // Array of objects like [{ id: 1, url: '...', alt: '...' }]
            currentIndex: 0,
            totalImages: images.length,
          }
        }
      }),
    ),

  setFocusedImage: (productId, id) =>
    set(
      produce((state) => {
        const gallery = state.galleries[productId]
        if (!gallery) return

        // Find the index of the image with the matching id
        const index = gallery.images.findIndex((image) => image.id === id)

        // Only update if we found a valid index
        if (index >= 0 && index < gallery.totalImages) {
          gallery.currentIndex = index
        }
      }),
    ),

  moveNext: (productId) =>
    set(
      produce((state) => {
        const gallery = state.galleries[productId]
        if (gallery) {
          gallery.currentIndex =
            (gallery.currentIndex + 1) % gallery.totalImages
        }
      }),
    ),

  movePrevious: (productId) =>
    set(
      produce((state) => {
        const gallery = state.galleries[productId]
        if (gallery) {
          gallery.currentIndex =
            (gallery.currentIndex - 1 + gallery.totalImages) %
            gallery.totalImages
        }
      }),
    ),

  // Selectors
  getFocusedImage: (productId) => {
    const state = get()
    const gallery = state.galleries[productId]
    return gallery ? gallery.images[gallery.currentIndex] : null
  },

  getNextImage: (productId) => {
    const state = get()
    const gallery = state.galleries[productId]
    if (!gallery) return null
    const nextIndex = (gallery.currentIndex + 1) % gallery.totalImages
    return gallery.images[nextIndex]
  },

  getPreviousImage: (productId) => {
    const state = get()
    const gallery = state.galleries[productId]
    if (!gallery) return null
    const prevIndex =
      (gallery.currentIndex - 1 + gallery.totalImages) % gallery.totalImages
    return gallery.images[prevIndex]
  },

  // Get all images except the focused one
  getUnfocusedImages: (productId) => {
    const state = get()
    const gallery = state.galleries[productId]
    if (!gallery) return []

    return gallery.images.filter((_, index) => index !== gallery.currentIndex)
  },

  getGalleryInfo: (productId) => {
    const state = get()
    return state.galleries[productId] || null
  },
}))
