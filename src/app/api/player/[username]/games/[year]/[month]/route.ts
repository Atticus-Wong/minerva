export async function GET(
  request: Request,
  { params }: { params: { username: string; year: string; month: string } }
) {
  try {
    const { username, year, month } = params
    const response = await fetch(
      `https://api.chess.com/pub/player/${username}/games/${year}/${month}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    const data = await response.json()
    console.log(data)
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error(err)
    return new Response('Error fetching game data', { status: 500 })
  }
}
