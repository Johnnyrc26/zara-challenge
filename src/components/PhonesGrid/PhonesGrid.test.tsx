import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import PhonesGrid from './PhonesGrid'
import { getPhones } from '../../api/phones/phoneService'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('../../api/phoneService', () => ({
  getPhones: jest.fn(),
}))

jest.mock('react-icons/ri', () => ({
  RiArrowLeftSLine: () => <span data-testid="prev-icon">Previous</span>,
  RiArrowRightSLine: () => <span data-testid="next-icon">Next</span>,
}))

describe('PhonesGrid Component', () => {
  const mockNavigate = jest.fn()
  const mockPhones = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      basePrice: 999,
      imageUrl: 'https://example.com/iphone.jpg',
    },
    {
      id: '2',
      name: 'Galaxy S23',
      brand: 'Samsung',
      basePrice: 899,
      imageUrl: 'https://example.com/galaxy.jpg',
    },
  ]

  beforeEach(() => {
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    ;(getPhones as jest.Mock).mockResolvedValue(mockPhones)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza correctamente el componente', async () => {
    render(
      <MemoryRouter>
        <PhonesGrid />
      </MemoryRouter>
    )

    expect(
      screen.getByPlaceholderText('Search for smartphone...')
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('2 RESULTS')).toBeInTheDocument()
    })
  })

  it('carga y muestra los teléfonos correctamente', async () => {
    render(
      <MemoryRouter>
        <PhonesGrid />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument()
      expect(screen.getByText('Galaxy S23')).toBeInTheDocument()
      expect(screen.getByText('2 RESULTS')).toBeInTheDocument()
    })
  })

  it('maneja la paginación correctamente', async () => {
    render(
      <MemoryRouter>
        <PhonesGrid />
      </MemoryRouter>
    )

    expect(screen.getByTestId('prev-icon').closest('button')).toBeDisabled()

    fireEvent.click(screen.getByTestId('next-icon'))

    await waitFor(() => {
      expect(getPhones).toHaveBeenCalledWith(0, '')
    })

    expect(screen.getByTestId('prev-icon').closest('button')).toBeDisabled()
  })

  it('filtra los teléfonos según la búsqueda', async () => {
    render(
      <MemoryRouter>
        <PhonesGrid />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('Search for smartphone...'), {
      target: { value: 'iPhone' },
    })

    await waitFor(() => {
      expect(getPhones).toHaveBeenCalledWith(0, 'iPhone')
    })
  })

  it('muestra un mensaje de error si falla la carga de datos', async () => {
    ;(getPhones as jest.Mock).mockRejectedValue(
      new Error('Error fetching phones')
    )

    render(
      <MemoryRouter>
        <PhonesGrid />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Error fetching phones')).toBeInTheDocument()
    })
  })

  it('navega al detalle del teléfono al hacer clic en una tarjeta', async () => {
    render(
      <MemoryRouter>
        <PhonesGrid />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(screen.getByText('iPhone 15 Pro'))
      expect(mockNavigate).toHaveBeenCalledWith('/phone/1')
    })
  })
})
