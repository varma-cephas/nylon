import { createFileRoute } from '@tanstack/react-router'
import { useFiles } from '@/context/Files'

export const Route = createFileRoute('/drive/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { files } = useFiles()
  return(
    <>
      {
        files?.length?
          <ul>
            {files.map((file, index: number) => (
              <li key={index}>{file.fileName}</li>
            ))}
          </ul>
          :
        <p>No file found</p>
      }
    </>
  )
}
