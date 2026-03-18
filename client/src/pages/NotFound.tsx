import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname)
  }, [location.pathname])

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center font-mono">
        <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
        <p className="mb-2 text-xl text-foreground">Page not found</p>
        <p className="mb-6 text-sm text-muted-foreground">{location.pathname}</p>
        <Button onClick={() => navigate("/")} className="font-mono">
          ← Go Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound