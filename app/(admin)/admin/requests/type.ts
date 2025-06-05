export type Request = {
  id: number
  book_title: string
  author_name: string
  action: 'add' | 'update' | 'delete'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  book_photos?: {
    photo_id: number
    url: string
  }[]
}
