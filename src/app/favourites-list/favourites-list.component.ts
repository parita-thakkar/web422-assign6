import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.css']
})
export class FavouritesListComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  favouritesSub: Subscription | undefined;
  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.data.getFavourites().subscribe((data: any) => this.favourites = data.tracks);
  }

  removingFavourites(id: any): void{
    this.favouritesSub = this.data.removeFromFavourites(id).subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  ngOnDestroy(): void{
    this.favouritesSub?.unsubscribe();
  }
}
