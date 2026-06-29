const fallbackImages = [
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=82",
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1400&q=82",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=82",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=82",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=82",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=82",
];

export function getStayFallbackImage(stayId) {
  const safeId = Number.isFinite(Number(stayId)) ? Number(stayId) : 1;
  return fallbackImages[Math.abs(safeId - 1) % fallbackImages.length];
}

export function applyStayImageFallback(event, stayId) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = getStayFallbackImage(stayId);
}
