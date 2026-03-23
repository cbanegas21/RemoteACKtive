# Blog Image Generation

## How to run

1. **Add your Gemini API key to `.env.local`:**
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Get a key at: https://aistudio.google.com/app/apikey

2. **Run the script:**
   ```bash
   node scripts/generate-blog-images.mjs
   ```

3. **Images are saved to:**
   ```
   public/images/blog/{slug}.png   (or .webp depending on what Gemini returns)
   ```

The script skips any slug that already has an image, so it is safe to re-run.

---

## How to display images in blog articles

The article page (`app/blog/[slug]/page.tsx`) has a `{/* HERO_IMAGE_PLACEHOLDER */}` comment
placed just after the article header. To add a hero image, replace that comment with:

```tsx
{/* Hero image */}
<div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10">
  <Image
    src={`/images/blog/${post.slug}.png`}
    alt={post.h1}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 800px"
    priority
  />
</div>
```

And add `import Image from "next/image"` at the top of `ArticleClient.tsx`.

---

## How to add a `coverImage` field to blog posts

If you want to store the image path per-post in the data layer:

1. Add the field to the `BlogPost` interface in `app/lib/blog.ts`:
   ```ts
   coverImage?: string; // e.g. "/images/blog/save-on-hiring-costs-new-llc.png"
   ```

2. Add `coverImage` to each post object in `blogPosts[]`.

3. In `ArticleClient.tsx`, use `post.coverImage` instead of the derived path.

4. In `BlogClientPage.tsx` (listing page), you can add a thumbnail using `post.coverImage`.

---

## Regenerating a single image

To regenerate one specific image, delete the existing file first:

```bash
rm public/images/blog/save-on-hiring-costs-new-llc.png
node scripts/generate-blog-images.mjs
```

The script will skip all slugs that already have files and only generate the missing one.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `GEMINI_API_KEY is not set` | Add key to `.env.local` |
| `HTTP 429` | Rate limit hit — the script auto-retries once after 10s |
| `No inlineData.data found` | The model may not support image output on your plan; try `gemini-2.0-flash-exp` |
| Images look wrong | Edit the prompt for that slug in `scripts/generate-blog-images.mjs` and re-run |
