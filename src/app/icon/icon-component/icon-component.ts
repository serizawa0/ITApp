import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon-component',
  imports: [],
  templateUrl: './icon-component.html',
  styleUrl: './icon-component.scss'
})
export class IconComponent implements  OnInit{
  @Input() fontsize!:number
  @Input() name?:string
  @Input() baseColor!:string
  @Input() hoverColor!:string
  svg?: SafeHtml
  constructor(
    private http:HttpClient,
    private sanitizer:DomSanitizer
  ){}
  ngOnInit(): void {
    if (!this.name) {
      this.http.get('icons/icon_supprimer.svg', { responseType: 'text' }).subscribe(
        svgText => {
          this.svg = this.sanitizer.bypassSecurityTrustHtml(svgText)
        }
      )  
    }
    else{
      this.http.get('icons/'+this.name+'.svg', { responseType: 'text' }).subscribe(
        svgText => {
          this.svg = this.sanitizer.bypassSecurityTrustHtml(svgText)
        }
      )
    }

  }
}
