import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';
import Album from '../Album';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy{

  releases: Array<Album> = [];
  releasesSub: Subscription | undefined;
  musicDataSub: Subscription | undefined;

  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.releasesSub = this.data.getNewReleases().subscribe((data: any) => this.releases = data.albums.items);
  }

  ngOnDestroy(){
    this.releasesSub?.unsubscribe();
    this.musicDataSub?.unsubscribe();
  }
}

