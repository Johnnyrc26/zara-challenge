import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import CarouselPhones from './CarouselPhones'
import { Phone } from '../../../api/phoneService'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('CarouselPhones Component', () => {
  const mockNavigate = jest.fn()
  const mockProducts: Phone[] = [
    {
      id: 'GPX-8A',
      brand: 'Google',
      name: 'Pixel 8a',
      description:
        'Descubre Pixel 8a, creado por Google. Saca fotos magníficas con la Cámara Pixel. Haz más en menos tiempo con la IA de Google, como arreglar imágenes borrosas, filtrar llamadas y aprender cosas nuevas. Sus funciones de seguridad del más alto nivel ayudan a proteger tus datos. Y se ha diseñado para durar. Todo, a un precio excepcional.',
      basePrice: 459,
      rating: 4.7,
      specs: {
        screen: '6.1" OLED Actua',
        resolution: '2400 x 1080 pixels',
        processor: 'Google Tensor G3',
        mainCamera: '64 MP + 13 MP',
        selfieCamera: '13 MP',
        battery: '4492 mAh',
        os: 'Android',
        screenRefreshRate: '120 Hz',
      },
      colorOptions: [
        {
          name: 'Obsidiana',
          hexCode: '#000000',
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.png',
        },
        {
          name: 'Porcelana',
          hexCode: '#F5F5F5',
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-porcelana.png',
        },
        {
          name: 'Celeste',
          hexCode: '#87CEEB',
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-celeste.png',
        },
      ],
      storageOptions: [
        {
          capacity: '128 GB',
          price: 459,
        },
        {
          capacity: '256 GB',
          price: 509,
        },
      ],
      similarProducts: [
        {
          id: 'APL-I15PM',
          brand: 'Apple',
          name: 'iPhone 15 Pro Max',
          basePrice: 1319,
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-I15PM-titanio-negro.png',
        },
        {
          id: 'SMG-A25',
          brand: 'Samsung',
          name: 'Galaxy A25 5G',
          basePrice: 239,
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.png',
        },
        {
          id: 'XMI-RN13P5G',
          brand: 'Xiaomi',
          name: 'Redmi Note 13 Pro 5G',
          basePrice: 399,
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-RN13P5G-midnight-black.png',
        },
        {
          id: 'MTO-G24',
          brand: 'Motorola',
          name: 'g24',
          basePrice: 119,
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/MTO-G24-gris.png',
        },
        {
          id: 'SMG-A05S',
          brand: 'Samsung',
          name: 'Galaxy A05s',
          basePrice: 119,
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A05S-black.png',
        },
        {
          id: 'SMG-A35',
          brand: 'Samsung',
          name: 'Galaxy A35 5G',
          basePrice: 333,
          imageUrl:
            'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A35-light-blue.png',
        },
      ],
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A.png', 
    },
  ]

  beforeEach(() => {
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza correctamente los productos', () => {
    
    render(<CarouselPhones similarProducts={mockProducts[0].similarProducts} />)

    expect(screen.getByText('Similar Items')).toBeInTheDocument()
    
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
    expect(screen.getByText('Galaxy A25 5G')).toBeInTheDocument()
    
    expect(screen.getAllByRole('img')).toHaveLength(6)
  })

  it('navega al detalle del producto al hacer clic en una tarjeta', () => {
    render(<CarouselPhones similarProducts={mockProducts[0].similarProducts} />)

    fireEvent.click(screen.getByText('iPhone 15 Pro Max'))
    expect(mockNavigate).toHaveBeenCalledWith('/phone/APL-I15PM')
  })
})
