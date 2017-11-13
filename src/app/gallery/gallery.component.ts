import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { GalleryImage } from '../models/GalleryImage.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: Observable<GalleryImage[]>
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.images = this.imageService.getImages();
  }
  ngOnChanges(){
    this.images = this.imageService.getImages();
  }

}
