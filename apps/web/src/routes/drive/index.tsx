import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { Files } from '@/context/Files'

export const Route = createFileRoute('/drive/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { files } = useContext(Files)
  return(
    <>
      {
        files?.length?
          <ul>
            {files.map(file => (
              <li>{file.fileName}</li>
            ))}
          </ul>
          :
        <p>No file found</p>
      }
    </>
  )
}
