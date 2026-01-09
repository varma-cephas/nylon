import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/drive')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
           <div>
       <header>
        <nav>
            <Link to='/drive/upload'>Upload</Link>
            <Link to='/drive/manage'>Manage</Link>
        </nav>
       </header>
        <Outlet/>
    </div>
  )
}
