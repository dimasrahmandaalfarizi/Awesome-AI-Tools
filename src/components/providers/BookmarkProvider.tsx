"use client"

import * as React from "react"

interface BookmarkContextType {
  bookmarks: string[]
  isBookmarked: (toolId: string) => boolean
  toggleBookmark: (toolId: string) => void
  removeBookmark: (toolId: string) => void
  setBookmarkList: (toolIds: string[]) => void
  clearBookmarks: () => void
  count: number
}

const BookmarkContext = React.createContext<BookmarkContextType | undefined>(undefined)

const STORAGE_KEY = "awesome_ai_bookmarks"

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = React.useState<string[]>([])
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setBookmarks(parsed)
        }
      }
    } catch {
      // ignore storage errors
    } finally {
      setMounted(true)
    }
  }, [])

  const saveToStorage = (newBookmarks: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks))
    } catch {
      // ignore storage errors
    }
  }

  const toggleBookmark = React.useCallback((toolId: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(toolId)
      const next = exists ? prev.filter(id => id !== toolId) : [...prev, toolId]
      saveToStorage(next)
      return next
    })
  }, [])

  const removeBookmark = React.useCallback((toolId: string) => {
    setBookmarks(prev => {
      const next = prev.filter(id => id !== toolId)
      saveToStorage(next)
      return next
    })
  }, [])

  const setBookmarkList = React.useCallback((toolIds: string[]) => {
    setBookmarks(toolIds)
    saveToStorage(toolIds)
  }, [])

  const clearBookmarks = React.useCallback(() => {
    setBookmarks([])
    saveToStorage([])
  }, [])

  const isBookmarked = React.useCallback((toolId: string) => {
    return bookmarks.includes(toolId)
  }, [bookmarks])

  const value = React.useMemo(() => ({
    bookmarks,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    setBookmarkList,
    clearBookmarks,
    count: mounted ? bookmarks.length : 0
  }), [bookmarks, isBookmarked, toggleBookmark, removeBookmark, setBookmarkList, clearBookmarks, mounted])

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const context = React.useContext(BookmarkContext)
  if (!context) {
    return {
      bookmarks: [],
      isBookmarked: () => false,
      toggleBookmark: () => {},
      removeBookmark: () => {},
      setBookmarkList: () => {},
      clearBookmarks: () => {},
      count: 0
    }
  }
  return context
}
