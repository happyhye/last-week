export default function getPbImageURL(items, fileName = 'photo') {
  return `${import.meta.env.VITE_PB_API}/files/${items.collectionId}/${items.id}/${items[fileName]}`
}