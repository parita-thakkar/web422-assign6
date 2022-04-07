import Artist from './Artist';

export default interface Album{
    id: string;
    type: string;
    artists: Array<Artist>;
    available_markets: Array<string>;
    href: string;
    images: Array<{height: number, url: string, width: number}>;
    name: string;
    release_date: string;
    total_tracks: number;
    uri: string;
    label: string;
    popularity: number;
    copyrights: Array<{ text: string; type: string }>;
    tracks: {
        items: Array<{
            id: string;
            preview_url: string;
            track_number: number;
            name: string;
            duration_ms: number;
            album: Album;
            artists: Array<Artist>;
        }>;
    };
}