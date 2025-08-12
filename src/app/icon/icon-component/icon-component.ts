import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon-component',
  imports: [],
  templateUrl: './icon-component.html',
  styleUrl: './icon-component.scss'
})
export class IconComponent implements  OnInit{
  svg?: SafeHtml
  constructor(
    private http:HttpClient,
    private sanitizer:DomSanitizer
  ){}
  ngOnInit(): void {
    this.http.get('icons/icon_supprimer.svg', { responseType: 'text' }).subscribe(
      svgText => {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(svgText)
      }
    )
  }
}
