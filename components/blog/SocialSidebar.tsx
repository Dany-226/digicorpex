'use client'

import { useState } from 'react'
import { Share2, Bookmark, Link2, Check } from 'lucide-react'

export default function SocialSidebar() {
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: window.location.href })
    } else {
      handleCopy()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 pt-2">
      <button
        onClick={handleShare}
        className="w-10 h-10 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all duration-200"
        aria-label="Partager"
      >
        <Share2 size={16} />
      </button>

      <div className="w-px h-6 bg-outline-variant/20" />

      <button
        onClick={() => setBookmarked((v) => !v)}
        className="w-10 h-10 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all duration-200"
        aria-label="Sauvegarder"
      >
        <Bookmark
          size={16}
          className={bookmarked ? 'fill-secondary text-secondary' : ''}
        />
      </button>

      <div className="w-px h-6 bg-outline-variant/20" />

      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all duration-200"
        aria-label="Copier le lien"
      >
        {copied ? (
          <Check size={16} className="text-secondary" />
        ) : (
          <Link2 size={16} />
        )}
      </button>
    </div>
  )
}
