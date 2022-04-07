export default interface Artist {
  name: string;
  href: string;
  id: string;
  type: string;
  uri: string;
  popularity: number;
  followers: { href: null; total: number };
  genres: Array<string>;
  images: Array<{url: string}>;
}
