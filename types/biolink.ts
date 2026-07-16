export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon?: string; // Bisa dikembangkan untuk ikon spesifik
}

export interface BiolinkData {
  bannerUrl: string;
  avatarUrl: string;
  name: string;
  bio: string;
  whatsappNumber: string;
  whatsappMessage: string;
  links: SocialLink[];
}
