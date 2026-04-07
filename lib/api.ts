export const BASE_URL = 'https://nt-spidyuniverse.onrender.com/api';

const isServer = typeof window === 'undefined';

async function apiFetch(path: string) {
  // On the server, we call the backend directly (user can't see server network tab)
  // On the client, we use the proxy to hide the backend URL
  let url: string;
  
  if (isServer) {
    url = `${BASE_URL}/${path}`;
  } else {
    // Use absolute URL for client-side fetch to avoid relative path issues
    const origin = window.location.origin;
    url = `${origin}/api/proxy?path=${path}`;
  }
    
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.error || errorData.details || `HTTP error ${res.status}`;
    console.error(`API Fetch Error (${path}):`, errorMessage);
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function fetchBatches() {
  return apiFetch('batches');
}

export async function fetchBatchDetails(batchId: string | number) {
  return apiFetch(`batches/${batchId}`);
}

export async function fetchFolder(folderId: string | number) {
  return apiFetch(`folders/${folderId}`);
}
