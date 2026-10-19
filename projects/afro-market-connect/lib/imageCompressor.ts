/**
 * Client-side image compression utility for low-bandwidth 2G/3G networks
 * Resizes large smartphone camera photos (3MB-10MB) down to optimized WebP/JPEG under ~80KB.
 */
export async function compressImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 800,
  quality: number = 0.72
): Promise<{ dataUrl: string; originalSize: number; compressedSize: number }> {
  return new Promise((resolve, reject) => {
    const originalSize = file.size;
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to create canvas 2D context"));
          return;
        }

        // Draw image with smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight JPEG dataURL
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

        // Calculate approximate size in bytes from base64
        const head = "data:image/jpeg;base64,";
        const base64Length = compressedDataUrl.length - head.length;
        const compressedSize = Math.round((base64Length * 3) / 4);

        resolve({
          dataUrl: compressedDataUrl,
          originalSize,
          compressedSize,
        });
      };

      img.onerror = () => reject(new Error("Failed to load image for compression"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount).replace("NGN", "₦");
}
