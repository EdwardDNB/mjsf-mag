export interface GalleryProps {
  items?: ImageItem[];
}
export interface ImageItem {
  id: number
  url: string
  title?: string
}
export interface GalleryItemProps {
  item: ImageItem
}
export interface GalleryImageProps {
  url: string
  title?: string
}
