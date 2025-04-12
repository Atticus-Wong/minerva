export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params
    const response = await fetch(`https://api.chess.com/pub/player/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error(err)
    return new Response('Error fetching chess player profile', { status: 500 })
  }
}
