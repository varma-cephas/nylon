import DragDropPage from '@/page/DragDrop'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drive/upload/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <>
      <DragDropPage />
    </>
  )
}
