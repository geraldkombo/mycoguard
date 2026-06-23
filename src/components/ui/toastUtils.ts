type ToastType = 'success' | 'info' | 'error'

let addToastExternal: ((message: string, type?: ToastType) => void) | null = null

export function showToast(message: string, type?: ToastType) {
  addToastExternal?.(message, type ?? 'success')
}

export function registerToastHandler(handler: (message: string, type?: ToastType) => void) {
  addToastExternal = handler
  return () => { addToastExternal = null }
}
