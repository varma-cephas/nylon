import type { DragDropType } from '@/types/Files'

export default function DragDrop({
  children,
  handleFileDrop,
  hanldeDragOver,
  handleDragEnter,
  handleDragLeave,
}: DragDropType) {
  return (
    <div
      className="flex flex-col h-screen  mx-auto p-6 space-y-6"
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={hanldeDragOver}
    >
      {children}
    </div>
  )
}
