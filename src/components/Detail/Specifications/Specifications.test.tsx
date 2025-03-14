import { render, screen } from '@testing-library/react';
import Specifications from './Specifications';
import { Phone } from '../../../api/phoneService';

describe('Specifications Component', () => {
  const mockPhone: Phone = {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    description: 'Un teléfono increíble',
    imageUrl: 'https://example.com/iphone.jpg',
    basePrice: 999,
    rating: 4.5,
    specs: {
      screen: '6.1"',
      resolution: '2556x1179',
      processor: 'A17 Bionic',
      mainCamera: '48 MP',
      selfieCamera: '12 MP',
      battery: '4000 mAh',
      os: 'iOS 17',
      screenRefreshRate: '120 Hz',
    },
    colorOptions: [],
    storageOptions: [],
    similarProducts: [],
  };

  it('renderiza correctamente el componente con los datos proporcionados', () => {
    render(<Specifications phone={mockPhone} selectedStorage={null} />);

    expect(screen.getByText('SPECIFICATIONS')).toBeInTheDocument();
    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPTION')).toBeInTheDocument();
    expect(screen.getByText('Un teléfono increíble')).toBeInTheDocument();
    expect(screen.getByText('SCREEN')).toBeInTheDocument();
    expect(screen.getByText('6.1"')).toBeInTheDocument();
    expect(screen.getByText('RESOLUTION')).toBeInTheDocument();
    expect(screen.getByText('2556x1179')).toBeInTheDocument();
    expect(screen.getByText('PROCESSOR')).toBeInTheDocument();
    expect(screen.getByText('A17 Bionic')).toBeInTheDocument();
    expect(screen.getByText('MAIN CAMERA')).toBeInTheDocument();
    expect(screen.getByText('48 MP')).toBeInTheDocument();
    expect(screen.getByText('SELFIE CAMERA')).toBeInTheDocument();
    expect(screen.getByText('12 MP')).toBeInTheDocument();
    expect(screen.getByText('BATTERY')).toBeInTheDocument();
    expect(screen.getByText('4000 mAh')).toBeInTheDocument();
    expect(screen.getByText('OS')).toBeInTheDocument();
    expect(screen.getByText('iOS 17')).toBeInTheDocument();
    expect(screen.getByText('SCREEN REFRESH RATE')).toBeInTheDocument();
    expect(screen.getByText('120 Hz')).toBeInTheDocument();
  });

  it('maneja correctamente los datos faltantes', () => {
    const mockPhoneWithMissingData: Phone = {
      id: '2',
      name: 'Galaxy S23',
      brand: 'Samsung',
      description: '',
      imageUrl: 'https://example.com/galaxy.jpg',
      basePrice: 899,
      rating: 4.5,
      specs: {
        screen: '',
        resolution: '',
        processor: '',
        mainCamera: '',
        selfieCamera: '',
        battery: '',
        os: '',
        screenRefreshRate: '',
      },
      colorOptions: [],
      storageOptions: [],
      similarProducts: [],
    };

    render(<Specifications phone={mockPhoneWithMissingData} selectedStorage={null} />);

    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S23')).toBeInTheDocument();
    expect(screen.getByText('DESCRIPTION')).toBeInTheDocument();
    expect(screen.getByText('SCREEN')).toBeInTheDocument();
    expect(screen.getByText('RESOLUTION')).toBeInTheDocument();
    expect(screen.getByText('PROCESSOR')).toBeInTheDocument();
    expect(screen.getByText('MAIN CAMERA')).toBeInTheDocument();
    expect(screen.getByText('SELFIE CAMERA')).toBeInTheDocument();
    expect(screen.getByText('BATTERY')).toBeInTheDocument();
    expect(screen.getByText('OS')).toBeInTheDocument();
    expect(screen.getByText('SCREEN REFRESH RATE')).toBeInTheDocument();
    expect(screen.getAllByText('N/A')).toHaveLength(9);
  });
});