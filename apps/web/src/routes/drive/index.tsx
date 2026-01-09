import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drive/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drive/"!</div>
}
