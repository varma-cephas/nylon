import { useFiles } from '@/context/Files'
import {
  createFileRoute,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { UploadCloudIcon } from 'lucide-react'

export const Route = createFileRoute('/drive')({
  component: DriveComponent,
})

function DriveComponent() {
  const { uploads } = useFiles()

  return (
    <div>
      <header className="flex bg-black text-white items-center p-2 justify-between sticky top-0">
        <Link to="/drive">Drive</Link>
      </header>
      <nav className="text-right p-4 list-none">
        <li>
          <Link
            activeProps={{ className: `hidden` }}
            className={`border p-2 bg-black text-white hover w-[fit-content] ${uploads && uploads.size && 'hidden'}`}
            to="/drive/upload"
          >
            <UploadCloudIcon className="inline" />
            <span className="pl-2">Upload</span>
          </Link>
        </li>
      </nav>
      <Outlet />
    </div>
  )
}
