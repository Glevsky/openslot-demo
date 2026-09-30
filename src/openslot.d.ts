declare module "openslot:client" {
  export const client: import("@sanity/client").SanityClient;
}

declare module "openslot:overlay" {
  const Overlay: (props: Record<string, never>) => unknown;
  export default Overlay;
}

declare module "cloudflare:workers" {
  export const env: {
    SANITY_API_READ_TOKEN?: string;
  };
}
