import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drive/manage/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drive/manage/"!</div>
}
