import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { fetchApi } from '@/lib/api';
import { ApiProduct } from '@/types/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    // Fetch products to include in the sitemap
    const productsResult = await fetchApi<any>('/api/site/products?per_page=1000&locale=ar&lang=ar');
    const list = Array.isArray(productsResult) ? productsResult : productsResult?.data ?? [];
    
    productRoutes = list.map((product: any) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap: Failed to fetch products', error);
  }

  return [...staticRoutes, ...productRoutes];
}
