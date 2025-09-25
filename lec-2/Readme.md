# Основи компонентів Vue.js

## Компонент Gallery
```mermaid
flowchart TD
    App["App.vue </br> (props: images)"] --> |props: images| Gallery["Gallery.vue"]

    Gallery --> GI["GalleryItem.vue  </br> (props: src, emit: select)"]
    Gallery --> GM["GalleryModal.vue </br> (props: src, emit: close)"]

    GI -->|emit select| Gallery
    Gallery -->|selected img → props: src| GM
    GM -->|emit close| Gallery

    classDef comp fill:#fff,stroke:#111,stroke-width:1px,rx:6,ry:6;
    class App,Gallery,GI,GM comp;
```

## Commands
1. Create project
    ```bash
     npm create vue@latest
     cd <project-dir>
     npm install
     npm run format
     npm run dev
    ```
2. Install TailwindCSS
   See: https://v3.tailwindcss.com/docs/guides/vite
    ```bash
     npm install -D sass-embedded
     npm install -D tailwindcss@3 postcss autoprefixer
     npx tailwindcss init -p
    ```
3. Configure TailwindCSS

```mermaid
flowchart TD
   App -- ":items: ImageItem[]" --> Gallery
   Gallery -- ":item: ImageItem" --> GalleryItem
   GalleryItem -- ":url: string, :title: string" --> GalleryImage
   GalleryImage -- "@load" --> GalleryItem
```
