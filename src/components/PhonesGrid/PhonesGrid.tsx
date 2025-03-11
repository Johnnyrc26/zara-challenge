import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPhones, Phones } from '../../api/phoneService'
import './PhonesGrid.css'
import './SearchBar.css'

interface PhonesGridProps {
  initialPage?: number
  itemsPerPage?: number
  onLoadingChange?: (isLoading: boolean) => void;
}
const PhonesGrid: React.FC<PhonesGridProps> = ({
  initialPage = 1,
  itemsPerPage = 21,
  onLoadingChange
}) => {
  const [phones, setPhones] = useState<Phones[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true)
        if (onLoadingChange) onLoadingChange(true);
        const data = await getPhones(page, itemsPerPage, searchQuery)
        const uniquePhones = data.filter(
          (phone, index, self) =>
            index === self.findIndex((p) => p.id === phone.id)
        )
        setPhones(uniquePhones)
        setError(null)
      } catch {
        setPhones([])
        setError('Error fetching phones')
      } finally {
        setLoading(false)
        if (onLoadingChange) onLoadingChange(false);
      }
    }

    fetchPhones()
  }, [page, itemsPerPage, searchQuery, onLoadingChange])

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setPage(1)
  }

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or brand..."
          className="search-input"
        />
        <p className="results-count">
          {loading ? 'Loading...' : `${phones.length} results found`}
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
            <h3 className="title">{phone.name}</h3>
            <p className="brand">{phone.brand}</p>
            <p className="price">${phone.basePrice}</p>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          className="button"
          disabled={page === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <button className="button" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  )
}

export default PhonesGrid
