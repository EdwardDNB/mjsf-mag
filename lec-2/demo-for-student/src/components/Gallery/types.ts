export interface ImageItem {
  id: number
  url: string
  title?: string
}
export interface GalleryProps {
  items?: ImageItem[];
}
export interface GalleryItemProps {
  item: ImageItem
  editable?: boolean
  removable?: boolean
  configurable?: boolean
  viewable?: boolean
}
