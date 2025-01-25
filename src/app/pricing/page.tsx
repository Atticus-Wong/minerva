
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Pricing() {
  return (
    <div className="justify-center flex items-center">
      <div className="max-w-[1440px] flex items-center py-10 justify-center gap-3">
        <div>
          <Card className="w-96 h-80">
            <CardHeader>
              <CardTitle><h3>Free</h3></CardTitle>
              <CardDescription>For casual players</CardDescription>
            </CardHeader>
            <CardContent>
              <p>...</p>
            </CardContent>
            <CardFooter>
              <p></p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-96 h-80">
            <CardHeader>
              <CardTitle><h3>Pro</h3></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Evaluate performance by opening variation with proficiency scores. Identify strengths and weaknesses to optimize your preparation and results.</p>
            </CardContent>
            <CardFooter>
              <p>[Analyze Your Openings]</p>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-96 h-80">
            <CardHeader>
              <CardTitle><h3>Tailored Training & Guidance</h3></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sharpen your repertoire with custom Stockfish puzzles and Minerva, your AI chess coach, for personalized advice to boost your Elo.
              </p>
            </CardContent>
            <CardFooter>
              <p>[Start Your Journey]</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}