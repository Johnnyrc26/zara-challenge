import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPhoneById, Phone } from '../api/phoneService'
import BackButton from '../components/Detail/BackButton/BackButton'
import Details from '../components/Detail/Details/Details'
import Specifications from '../components/Detail/Specifications/Specifications'
import CarouselPhones from '../components/Detail/CarruselPhones/CarruselPhones'

const PhoneDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [phone, setPhone] = useState<Phone | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      try {
        setLoading(true)
        const data = await getPhoneById(id!)
        setPhone(data)
        setSelectedColor(data.colorOptions[0]?.name)
        setError(null)
      } catch {
        setError('Error fetching phone details')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPhoneDetails()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!phone) return <p>Phone not found</p>

  return (
    <div>
      <div>
        <BackButton />
        <Details
          phone={phone}
          selectedStorage={selectedStorage}
          selectedColor={selectedColor}
          onStorageChange={setSelectedStorage}
          onColorChange={setSelectedColor}
          onAddToCart={() => navigate('/cart')}
        />
        <Specifications phone={phone} selectedStorage={selectedStorage} />
        <CarouselPhones similarProducts={phone.similarProducts} />
      </div>
    </div>
  )
}

export default PhoneDetail
