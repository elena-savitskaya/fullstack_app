// данній хук возвращает функцию
// если в объекте виндоу есть оюъект text, то выводим сообщение - текст

import { useCallback } from 'react'

export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text) {
      window.M.toast({ html: text })
    }
  }, [])
}
