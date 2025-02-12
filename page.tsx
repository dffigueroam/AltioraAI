import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Brain, BarChart, Upload } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-[#CBA135]/90">
      <header className="bg-[#8B0000]/80 text-[#CBA135]/90">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            AltiorAI
          </Link>
          <nav className="space-x-2 flex items-center flex-wrap">
            <Link href="/about" className="hover:underline">
              Acerca de
            </Link>
            <Link href="/features" className="hover:underline">
              Características
            </Link>
            <Link href="/contact" className="hover:underline">
              Contacto
            </Link>
            <Link href="/login" className="bg-[#121212]/80 text-[#CBA135] px-4 py-2 rounded hover:bg-opacity-100">
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="bg-[#CBA135]/80 text-[#121212] px-4 py-2 rounded hover:bg-opacity-100 ml-2"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section - Updated */}
        <section className="bg-gradient-to-r from-[#8B0000]/70 to-[#121212] text-[#CBA135]/90 py-12">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Transformando la Educación</h1>
            <p className="text-lg md:text-xl mb-6 text-[#CBA135]/80">
              Una plataforma integral para estudiantes, profesores, directivos y familias.
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-6 text-[#CBA135]">Siempre más alto en el aprendizaje</p>
            <Button size="lg" className="bg-[#CBA135]/70 text-[#121212] hover:bg-[#CBA135]/90" asChild>
              <Link href="/register">Comienza Ahora</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#CBA135]/90">Características Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <BookOpen className="h-10 w-10 mb-4 text-[#8B0000]/70" />,
                  title: "Consulta temas de clases",
                  description: "Organiza y accede a todos los cursos desde un solo lugar.",
                },
                {
                  icon: <Users className="h-10 w-10 mb-4 text-[#8B0000]/70" />,
                  title: "Colaboración",
                  description: "Facilita la comunicación entre estudiantes, profesores y padres.",
                },
                {
                  icon: <Brain className="h-10 w-10 mb-4 text-[#8B0000]/70" />,
                  title: "IA Personalizada",
                  description: "Recomendaciones de aprendizaje basadas en IA.",
                },
                {
                  icon: <BarChart className="h-10 w-10 mb-4 text-[#8B0000]/70" />,
                  title: "Seguimiento de Progreso",
                  description: "Monitorea el rendimiento académico y emocional.",
                },
                {
                  icon: <Upload className="h-10 w-10 mb-4 text-[#8B0000]/70" />,
                  title: "Carga de Documentos",
                  description: "Analiza documentos con IA para obtener insights valiosos.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="text-center bg-[#121212] border-[#CBA135]/20 border hover:border-[#CBA135]/50 transition-colors duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-center">{feature.icon}</div>
                    <CardTitle className="text-[#CBA135]/90">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#CBA135]/70">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#121212]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#CBA135]/90">Lo que dicen nuestros usuarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "María González",
                  role: "Estudiante",
                  quote:
                    "AltiorAI ha transformado mi experiencia de aprendizaje. Las recomendaciones personalizadas son increíbles.",
                },
                {
                  name: "Carlos Rodríguez",
                  role: "Profesor",
                  quote:
                    "Esta plataforma ha simplificado enormemente la gestión de mis cursos y la comunicación con los padres.",
                },
                {
                  name: "Ana Martínez",
                  role: "Madre",
                  quote:
                    "Ahora puedo seguir fácilmente el progreso de mi hija y comunicarme directamente con sus profesores.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-[#121212] border-[#CBA135]/20 border">
                  <CardHeader>
                    <CardTitle className="text-[#CBA135]">{testimonial.name}</CardTitle>
                    <CardDescription className="text-[#CBA135]/70">{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-[#CBA135]/80">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#8B0000]/70 text-[#CBA135]/90">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Únete a la Revolución Educativa</h2>
            <p className="text-xl mb-8">Regístrate hoy y comienza a transformar la experiencia educativa.</p>
            <Button size="lg" className="bg-[#CBA135]/70 text-[#121212] hover:bg-[#CBA135]/90" asChild>
              <Link href="/register">Registrarse Gratis</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#8B0000]/80 text-[#CBA135]/80 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">AltiorAI</h3>
              <p className="text-sm">Transformando la educación a través de la tecnología y la colaboración.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm hover:underline">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-sm hover:underline">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm hover:underline">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:underline">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm hover:underline">
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm hover:underline">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-[#CBA135]/90 hover:text-[#CBA135]">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-[#CBA135]/90 hover:text-[#CBA135]">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-[#CBA135]/90 hover:text-[#CBA135]">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#CBA135]/20 pt-8 text-center">
            <p className="text-sm text-[#CBA135]/70">
              &copy; {new Date().getFullYear()} AltiorAI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

