export type ChessProfile = {
  player_id: string
  id: string
  url: string
  name: string
  username: string
  followers: number
  country: string
  last_online: number
  joined: number
  status: string
  is_streamer: boolean
  verified: boolean
  league: string
}

export type User = {
  uuid: string
  id: number
  name: string
  email: string
  password: string
  created_at: Date
  chesscom_username: string
  lichess_username: string
}

export type ChessStats = {
  chess_rapid: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: number
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  chess_bullet: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: number
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  chess_blitz: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: number
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  fide: number
  tactics: {
    highest: {
      rating: number
      date: number
    }
    lowest: {
      rating: number
      date: number
    }
  }
  puzzle_rush: {
    best: {
      total_attempts: number
      score: number
    }
  }
}
