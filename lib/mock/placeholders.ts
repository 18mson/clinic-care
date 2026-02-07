export const PLACEHOLDER_IMAGE = 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800';
export const PLACEHOLDER_HOSPITAL = 'https://images.pexels.com/photos/12104186/pexels-photo-12104186.jpeg?auto=compress&cs=tinysrgb&w=800';


// Mock images grouped by clinic id/key. Use these when API returns relative/local paths.
export const MOCK_IMAGES: Record<string, string[]> = {
  clinic1: [
    'https://images.pexels.com/photos/4966406/pexels-photo-4966406.jpeg',
    'https://images.pexels.com/photos/12081338/pexels-photo-12081338.jpeg',
    'https://images.pexels.com/photos/11660582/pexels-photo-11660582.jpeg',
    'https://images.pexels.com/photos/11722768/pexels-photo-11722768.jpeg',
    'https://images.pexels.com/photos/12104186/pexels-photo-12104186.jpeg',
    'https://images.pexels.com/photos/4421501/pexels-photo-4421501.jpeg',
  ],
  clinic2: [
    'https://images.pexels.com/photos/1170972/pexels-photo-1170972.jpeg',
    'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg',
    'https://images.pexels.com/photos/3845765/pexels-photo-3845765.jpeg',
    'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    'https://images.pexels.com/photos/3845742/pexels-photo-3845742.jpeg',
    'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg',
  ],
  clinic3: [
    'https://images.pexels.com/photos/3845765/pexels-photo-3845765.jpeg',
    'https://images.pexels.com/photos/305567/pexels-photo-305567.jpeg',
    'https://images.pexels.com/photos/1170972/pexels-photo-1170972.jpeg',
    'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    'https://images.pexels.com/photos/3845742/pexels-photo-3845742.jpeg',
    'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg',
  ],
};

export const MOCK_DOCTOR = {
  doc1: 'https://images.pexels.com/photos/19438566/pexels-photo-19438566/free-photo-of-doctor.jpeg',
  doc2: 'https://images.pexels.com/photos/3845764/pexels-photo-3845764.jpeg',
  doc3: 'https://images.pexels.com/photos/3778613/pexels-photo-3778613.jpeg',
  doc4: 'https://images.pexels.com/photos/3845742/pexels-photo-3845742.jpeg',
  doc5: 'https://images.pexels.com/photos/3778613/pexels-photo-3778613.jpeg',
  doc6: 'https://images.pexels.com/photos/3845742/pexels-photo-3845742.jpeg',
}

/**
 * Normalize an image URL.
 * - If it's a full http(s) URL, return as-is.
 * - If it's a relative path (starts with '/'), map it to a mock image from MOCK_IMAGES.
 * - Otherwise return the placeholder image.
 */
export function normalizeImage(img?: string | null): string {
  if (!img) return PLACEHOLDER_IMAGE;
  if (/^https?:\/\//i.test(img)) return img;
  // map known relative paths to mock images
  const lower = img.toLowerCase();
  if (lower.includes('mayapada')) {
    // choose index by filename if possible
    if (lower.includes('main')) return MOCK_IMAGES.clinic1[0];
    if (lower.includes('room1')) return MOCK_IMAGES.clinic1[1];
    if (lower.includes('operation')) return MOCK_IMAGES.clinic1[2];
    if (lower.includes('exterior')) return MOCK_IMAGES.clinic1[3];
    return MOCK_IMAGES.clinic1[0];
  }
  return PLACEHOLDER_IMAGE;
}
