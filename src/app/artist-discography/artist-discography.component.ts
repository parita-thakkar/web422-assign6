import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Params } from '@angular/router';
import Album from '../Album';
import Artist from '../Artist';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: Array<Album> = [];
  artist: Artist = {} as Artist;
  albumsSub: Subscription | undefined;
  artistSub: Subscription | undefined;
  musicDataSub: Subscription | undefined;
  
  constructor(private data : MusicDataService, private matBar : MatSnackBar,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.musicDataSub = this.route.params.subscribe((params) => {
      this.artistSub = this.data.getArtistById(params["id"]).subscribe((data: any) => {
          this.artist = data;
      this.albumsSub = this.data.getAlbumsByArtistId(params["id"]).subscribe((data: any) => {
            this.albums = data.items;
        })
      })
    });
  }

  ngOnDestroy(): void{
    this.albumsSub?.unsubscribe();
    this.musicDataSub?.unsubscribe();
  }
}
