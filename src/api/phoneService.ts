import apiClient from './apiClient'

export interface Phone {
  id: string
  name: string
  brand: string
  description?: string
  basePrice: number
  rating: number
  imageUrl: string
  specs: {
    screen: string
    resolution: string
    processor: string
    mainCamera: string
    selfieCamera: string
    battery: string
    os: string
    screenRefreshRate: string
  }
  colorOptions: {
    name: string;
    hexCode: string;
    imageUrl: string;
  }[],
  storageOptions: {
    capacity: string;
    price: number;
  }[],
  similarProducts: {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    imageUrl: string;
  }[],
}

export interface Phones {
  id: string
  name: string
  brand: string
  basePrice: number
  imageUrl: string
}

export const getPhones = async (
  page: number = 0,
  search: string = ''
): Promise<Phones[]> => {
  try {
    const limit: number = 21;
    const response = await apiClient.get(`/products`, {
      params: { offset: page * limit, limit, search },
    })
    return response.data.map(
      (phone: {
        id: string
        brand: string
        name: string
        basePrice: number
        imageUrl: string
      }) => ({
        id: phone.id,
        brand: phone.brand,
        name: phone.name,
        basePrice: phone.basePrice,
        imageUrl: phone.imageUrl,
      })
    )
  } catch (error) {
    console.error('Error fetching phones:', error)
    throw error
  }
}

export const getPhoneById = async (id: string): Promise<Phone> => {
  try {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching phone by ID:', error)
    throw error
  }
}
