import { supabase } from '../../api/supabase/supabaseClient'
import { getPhoneById } from '../phones/phoneService'

interface SupabaseCartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  imageUrl: string
  color: string | null
  capacity: string | null
}

export interface CartItem {
  id: string
  productId: string
  name: string
  quantity: number
  price: number
  imageUrl: string
  color: string | null
  capacity: string | null
}

const checkSession = async (): Promise<string> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  if (error || !session || !session.user) {
    throw new Error('No active session. Please log in.')
  }
  return session.user.id
}

export const addToCart = async (
  productId: string,
  quantity: number = 1,
  color: string | null = null,
  capacity: string | null = null,
  imageUrl: string | null = null
): Promise<CartItem> => {
  try {
    const userId = await checkSession()

    // First, check if there's an existing cart item with the same product, color, and capacity
    const { data: existingItem, error: fetchError } = await supabase
      .from('shopping_cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('color', color)
      .eq('capacity', capacity)
      .eq('imageUrl', imageUrl)
      .maybeSingle()

    if (fetchError) throw fetchError

    let result

    if (existingItem) {
      // If item exists, update the quantity by adding the new quantity
      const { data, error: updateError } = await supabase
        .from('shopping_cart')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (updateError) throw updateError
      result = data
    } else {
      // If item doesn't exist, insert a new one
      const { data, error: insertError } = await supabase
      .from('shopping_cart')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity,
        color,
        capacity,
        imageUrl,
      })
      .select()
      .single()

    if (insertError) throw insertError
    result = data
    }
    
    const product = await getPhoneById(productId)

    return {
      id: result.id,
      productId: productId,
      name: product.name,
      quantity: result.quantity,
      price: product.basePrice,
      imageUrl: result.imageUrl ?? product.imageUrl,
      color: result.color,
      capacity: result.capacity,
    }
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const userId = await checkSession()
    const { data, error } = await supabase
      .from('shopping_cart')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    const detailedItems = await Promise.all(
      data.map(async (item: SupabaseCartItem) => {
        try {
          const product = await getPhoneById(item.product_id)
          return {
            id: item.id,
            productId: item.product_id,
            name: product.name,
            quantity: item.quantity,
            price: product.basePrice,
            imageUrl: item.imageUrl,
            color: item.color,
            capacity: item.capacity,
          }
        } catch (error) {
          console.error(`Error fetching product ${item.product_id}:`, error)
          return null
        }
      })
    )

    return detailedItems.filter((item): item is CartItem => item !== null)
  } catch (error) {
    console.error('Error fetching cart items:', error)
    throw error
  }
}

export const removeFromCart = async (productId: string): Promise<void> => {
  try {
    const userId = await checkSession()
    const { error } = await supabase
      .from('shopping_cart')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (error) throw error
  } catch (error) {
    console.error('Error removing from cart:', error)
    throw error
  }
}
