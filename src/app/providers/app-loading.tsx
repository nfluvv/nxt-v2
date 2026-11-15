import { Container, Loader } from "@/shared/client/ui"

export function AppLoading() {
  return (
    <main className="pb-0!">
      <Container className="flex min-h-screen items-center justify-center">
        <Loader />
      </Container>
    </main>
  )
}
