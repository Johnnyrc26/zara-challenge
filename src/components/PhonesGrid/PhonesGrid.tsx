import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPhones, Phones } from '../../api/phones/phoneService'
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeartLine,
  RiHeartFill,
} from 'react-icons/ri'

import './PhonesGrid.css'
import './SearchBar.css'

interface PhonesGridProps {
  initialPage?: number
  itemsPerPage?: number
  onLoadingChange?: (isLoading: boolean) => void
}
const PhonesGrid: React.FC<PhonesGridProps> = ({
  initialPage = 0,
  onLoadingChange,
}) => {
  const [phones, setPhones] = useState<Phones[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [searchQuery, setSearchQuery] = useState('')
  const [likedPhones, setLikedPhones] = useState<Set<string>>(new Set())
  const navigate = useNavigate()

  const toggleLike = useCallback((phoneId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedPhones((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(phoneId)) {
        newLiked.delete(phoneId)
      } else {
        newLiked.add(phoneId)
      }
      return newLiked
    })
  }, [])

  const fetchPhones = useCallback(
    async (page: number) => {
      try {
        setLoading(true)
        if (onLoadingChange) onLoadingChange(true)

        let fetchedPhones: Phones[] = []
        const seenIds = new Set<string>()
        let currentPage = page

        while (fetchedPhones.length < 20) {
          const data = await getPhones(currentPage, searchQuery)

          const uniqueNewPhones = data.filter((phone) => {
            if (seenIds.has(phone.id)) {
              return false
            }
            seenIds.add(phone.id)
            return true
          })

          fetchedPhones = [...fetchedPhones, ...uniqueNewPhones]

          if (data.length < 20) break

          currentPage++
        }

        setPhones(fetchedPhones.slice(0, 20))
        setError(null)
      } catch {
        setPhones([])
        setError('Error fetching phones')
      } finally {
        setLoading(false)
        if (onLoadingChange) onLoadingChange(false)
      }
    },
    [searchQuery, onLoadingChange]
  )

  useEffect(() => {
    setPhones([])
    fetchPhones(page)
  }, [page, fetchPhones])

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setPage(0)
    setPhones([])
  }

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for smartphone..."
          className="search-input"
        />
        <p className="results-count">
          {loading ? 'Loading...' : `${phones.length} RESULTS`}
        </p>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && phones.length === 0 && (
        <p className="empty-text">No phones found</p>
      )}

      <div className="grid">
        {phones.map((phone) => (
          <div
            key={phone.id}
            className="card"
            onClick={() => navigate(`/phone/${phone.id}`)}
          >
            <img src={phone.imageUrl} alt={phone.name} className="image" />
            <button
              className="like-button"
              onClick={(e) => toggleLike(phone.id, e)}
              aria-label={
                likedPhones.has(phone.id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
            >
              {likedPhones.has(phone.id) ? (
                <RiHeartFill className="heart-icon filled" />
              ) : (
                <RiHeartLine className="heart-icon" />
              )}
            </button>
            <div className="text-container">
              <p className="brand">{phone.brand}</p>
              <div className="title">
                <span className="name">{phone.name}</span>
                <span className="price">{phone.basePrice} EUR</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          className="button"
          disabled={page === 0}
          onClick={handlePreviousPage}
          aria-label="Previous Page"
        >
          <RiArrowLeftSLine />
        </button>
        <button
          className="button"
          disabled={phones.length < 20}
          onClick={handleNextPage}
          aria-label="Next Page"
        >
          <RiArrowRightSLine />
        </button>
      </div>
    </div>
  )
}

export default PhonesGrid
