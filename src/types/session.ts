export interface Session {
  session_id: string
  id: string
  name: string
  pgn: string
  created_at: Date
  updated_at: Date
  chat_id: string
  type: 'LICHESS' | 'CHESSCOM'
  chesscom_link?: string
  lichess_link?: string
}
