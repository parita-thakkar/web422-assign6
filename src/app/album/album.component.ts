import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import Album from '../Album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: Album = {} as Album;
  albumSub: Subscription | undefined;
  musicDataSub: Subscription | undefined;

  constructor(private data : MusicDataService, private matBar : MatSnackBar,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.albumSub = this.route.params.subscribe((params: Params) => {
    this.musicDataSub = this.data.getAlbumById(params["id"]).subscribe((data: any) => {
    this.album = data;
      })
    });
  }

  addingFavourites(id: any): void{
    this.data.addToFavourites(id).subscribe((success) => {
      this.matBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    },
    (err: any) => {
      this.matBar.open("Unable to add song to favourites!");
    });
  }

  ngOnDestroy(): void{
    this.albumSub?.unsubscribe();
    this.musicDataSub?.unsubscribe();
  }
}
