import { supabase } from '../supabase/supabaseClient'
import { getPhoneById } from '../phones/phoneService'

export const addToFavorites = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('user_favorites')
    .insert([
      {
        user_id: userId,
        product_id: productId,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error adding to favorites:', error)
    throw error
  }

  return data
}

export const removeFromFavorites = async (
  userId: string,
  productId: string
) => {
  const { error } = await supabase
    .from('user_favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) {
    console.error('Error removing from favorites:', error)
    throw error
  }

  return true
}

export const isFavorite = async (userId: string, productId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle()

    if (error) {
      throw error
    }

    return !!data
  } catch (error) {
    console.error('Error checking favorite:', error)
    return false
  }
}

export const getUserFavorites = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('product_id, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!data || data.length === 0) return []

    const products = await Promise.all(
      data.map(async (item) => {
        try {
          const product = await getPhoneById(item.product_id)
          return { ...product, favorited_at: item.created_at }
        } catch (error) {
          console.error(`Error fetching product ${item.product_id}:`, error)
          return null
        }
      })
    )

    return products.filter((product) => product !== null)
  } catch (error) {
    console.error('Error getting user favorites:', error)
    throw error
  }
}

export const toggleFavorite = async (userId: string, productId: string) => {
  try {
    const isFavorited = await isFavorite(userId, productId)

    if (isFavorited) {
      await removeFromFavorites(userId, productId)
      return false
    } else {
      await addToFavorites(userId, productId)
      return true
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    throw error
  }
}
