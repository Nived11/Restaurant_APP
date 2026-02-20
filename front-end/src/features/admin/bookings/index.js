// src/features/admin/banners/index.js

// 1. Export Hook
export { useBanner } from './hooks/useBanner';

// 2. Export Components (BannersPage വേണ്ട, അത് ഇപ്പോൾ Pages-ൽ ആണ്)
export { default as BannersList } from './components/BannersList';
export { default as BannerFormModal } from './components/BannerFormModal';
export { default as BannerDetailModal } from './components/BannerDetailModal';
export { default as DeleteModal } from './components/DeleteModal';