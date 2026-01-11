import FilesContext from '@/context/Files'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/drive')({
  component: DriveComponent,
})

function DriveComponent() {
  return(
    <FilesContext>
      <div>
      <header className="flex bg-black text-white items-center justify-between border-b sticky top-0">
        <h1>Drive</h1>
      </header>
      <div>
          <nav className='flex list-none justify-center gap-2'>
            <li><Link to='/drive'>Manage</Link></li>
            <li><Link to='/drive/upload'>Upload</Link></li>
          </nav>
      </div>
      <Outlet/>
    </div>
    </FilesContext>
  )
}
