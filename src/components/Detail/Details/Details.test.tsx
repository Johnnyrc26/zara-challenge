import { render, screen, fireEvent } from '@testing-library/react'
import Details from './Details'
import { useCartStore } from '../../../store/cartStore'
import { CartProvider } from '../../../store/context/cartProvider'

jest.mock('../../../store/cartStore', () => ({
  useCartStore: jest.fn(),
}))

describe('Details Component', () => {
  const mockAddToCart = jest.fn()
  const mockPhone = {
    id: 'SNY-XPERIA1V',
    brand: 'SONY',
    name: 'Xperia 1 V',
    description:
      'Descubre el diseño táctil funcional. En el Xperia 1 V, cada detalle, superficie, textura y forma se han tenido muy en cuenta para mejorar tu experiencia de usuario. Con su elegante acabado mate, los materiales del Xperia 1 V combinan el atractivo estético con un rendimiento en el mundo real impecable.',
    basePrice: 959.42,
    rating: 4.7,
    imageUrl:
      'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SNY-XPERIA1V.png',
    specs: {
      screen: '6.5" OLED 4K HDR',
      resolution: 'No especificado',
      processor: 'Qualcomm Snapdragon 8 Gen 2',
      mainCamera: 'No especificado',
      selfieCamera: 'No especificado',
      battery: '5000 mAh',
      os: 'Android',
      screenRefreshRate: 'No especificado',
    },
    colorOptions: [
      {
        name: 'Negro',
        hexCode: '#000',
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SNY-XPERIA1V-negro.png',
      },
    ],
    storageOptions: [
      {
        capacity: '256 GB',
        price: 959.42,
      },
    ],
    similarProducts: [
      {
        id: 'SMG-S24U',
        brand: 'Samsung',
        name: 'Galaxy S24 Ultra',
        basePrice: 1329,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.png',
      },
      {
        id: 'OPP-A60',
        brand: 'OPPO',
        name: 'A60',
        basePrice: 179,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-A60-midnight-purple.png',
      },
      {
        id: 'XIA-R12',
        brand: 'Xiaomi',
        name: 'Redmi 12',
        basePrice: 117.29,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XIA-R12-sky-blue.png',
      },
      {
        id: 'XMI-14',
        brand: 'Xiaomi',
        name: '14',
        basePrice: 899,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-14-negro.png',
      },
      {
        id: 'SMG-A35',
        brand: 'Samsung',
        name: 'Galaxy A35 5G',
        basePrice: 333,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A35-light-blue.png',
      },
      {
        id: 'XMI-R13C',
        brand: 'Xiaomi',
        name: 'Redmi 13C',
        basePrice: 149,
        imageUrl:
          'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-R13C-navy-blue.png',
      },
    ],
  }

  beforeEach(() => {
    ;(useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza correctamente los detalles del teléfono', () => {
    render(
      <CartProvider>
        <Details
          phone={mockPhone}
          selectedStorage="256 GB"
          selectedColor="Negro"
          onStorageChange={jest.fn()}
          onColorChange={jest.fn()}
          onAddToCart={jest.fn()} imageUrl={null}        />
      </CartProvider>
    )

    expect(screen.getByText('Xperia 1 V')).toBeInTheDocument()
    expect(screen.getByText('From 1918.84 EUR')).toBeInTheDocument()
    expect(screen.getByText('256 GB')).toBeInTheDocument()
    expect(screen.getByTitle('Negro')).toBeInTheDocument()
  })

  it('cambia el almacenamiento al hacer clic en un botón', () => {
    const mockOnStorageChange = jest.fn()
    render(
      <CartProvider>
        <Details
          phone={mockPhone}
          selectedStorage="256 GB"
          selectedColor="Negro"
          onStorageChange={mockOnStorageChange}
          onColorChange={jest.fn()}
          onAddToCart={jest.fn()} imageUrl={null}        />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('256 GB'))
    expect(mockOnStorageChange).toHaveBeenCalledWith('256 GB')
  })

  it('cambia el color al hacer clic en un botón', () => {
    const mockOnColorChange = jest.fn()
    render(
      <CartProvider>
        <Details
          phone={mockPhone}
          selectedStorage="256 GB"
          selectedColor="Negro"
          onStorageChange={jest.fn()}
          onColorChange={mockOnColorChange}
          onAddToCart={jest.fn()} imageUrl={null}        />
      </CartProvider>
    )

    fireEvent.click(screen.getByTitle('Negro'))
    expect(mockOnColorChange).toHaveBeenCalledWith('Negro')
  })

  it('añade el producto al carrito cuando se hace clic en "AÑADIR"', () => {
    const mockOnAddToCart = jest.fn()
    render(
      <CartProvider>
        <Details
          phone={mockPhone}
          selectedStorage="256 GB"
          selectedColor="Negro"
          onStorageChange={jest.fn()}
          onColorChange={jest.fn()}
          onAddToCart={mockOnAddToCart} imageUrl={null}        />
      </CartProvider>
    )

    fireEvent.click(screen.getByText('AÑADIR'))
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 'SNY-XPERIA1V',
      name: 'Xperia 1 V',
      quantity: 1,
      price: 1918.84,
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SNY-XPERIA1V-negro.png',
      color: 'Negro',
      capacity: '256 GB',
    })
    expect(mockOnAddToCart).toHaveBeenCalled()
  })

  it('deshabilita el botón "AÑADIR" si no se selecciona almacenamiento o color', () => {
    render(
      <CartProvider>
        <Details
          phone={mockPhone}
          selectedStorage={null}
          selectedColor=""
          onStorageChange={jest.fn()}
          onColorChange={jest.fn()}
          onAddToCart={jest.fn()} imageUrl={null}        />
      </CartProvider>
    )

    expect(screen.getByText('AÑADIR')).toBeDisabled()
  })

  it('muestra el botón de like y cambia su estado al hacer clic', () => {
    render(
      <CartProvider>
        <Details
          phone={mockPhone}
          selectedStorage="256 GB"
          selectedColor="Negro"
          onStorageChange={jest.fn()}
          onColorChange={jest.fn()}
          onAddToCart={jest.fn()} imageUrl={null}
        />
      </CartProvider>
    )


    const likeButton = screen.getByRole('button', { name: /add to favorites/i })
    expect(likeButton).toBeInTheDocument()


    const emptyHeart = screen.getByTestId('heart-icon')
    expect(emptyHeart).toHaveClass('detail-heart-icon')
    expect(emptyHeart).not.toHaveClass('filled')
   
    fireEvent.click(likeButton)

    const filledHeart = screen.getByTestId('heart-icon')
    expect(filledHeart).toHaveClass('detail-heart-icon filled')

    fireEvent.click(likeButton)

    const emptyHeartAgain = screen.getByTestId('heart-icon')
    expect(emptyHeartAgain).toHaveClass('detail-heart-icon')
    expect(emptyHeartAgain).not.toHaveClass('filled')
  })
})
