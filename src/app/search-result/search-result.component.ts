import { Component, OnDestroy,OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import Artist from '../Artist';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: Array<Artist> = [];
  searchQuery: string = "";

  musicServiceSub: Subscription | undefined;
  artistSub: Subscription | undefined;

  constructor(private data : MusicDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.musicServiceSub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['artistName'];
      this.artistSub = this.data.searchArtists(params['artistName']).subscribe((data) => {
          this.results = data.artists.items.filter((artist: Artist) => artist.images.length > 0)
      });
    })
  }

  ngOnDestroy(): void{
    this.artistSub?.unsubscribe();
    this.musicServiceSub?.unsubscribe();
  }
}
