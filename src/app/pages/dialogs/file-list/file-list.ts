import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LiaisonBack } from '../../../services/liaisonBack/liaison-back';
import { Task } from '../../../../interfaces/TaskInterfaces';
import { FileInterface } from '../../../../interfaces/FileInterface';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PicLook } from '../pic-look/pic-look';
import { IconComponent } from '../../../icon/icon-component/icon-component';

@Component({
  selector: 'app-file-list',
  imports: [
    ReactiveFormsModule, IconComponent
  ],
  templateUrl: './file-list.html',
  styleUrl: './file-list.scss'
})
export class FileList implements OnInit, OnChanges{
  @Input() taskTitle:string = ''
  @Input() id:string = ''
  @Input() taskId:string = ''
  @Output() action = new EventEmitter<string>()
  images:FileInterface[] = []
  autres:FileInterface[] = []
  fichiers:FileInterface[] = []
  selectedFiles:File[] = []
  constructor(
    private formBuilder:FormBuilder,
    private liaison:LiaisonBack,
    private overlay: Overlay
  ){
  }
  ngOnInit(): void {
    console.log(this.id+' '+this.taskId); 
    this.getFiles()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.getFiles()
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFiles = Array.from(input.files);
      console.log(this.selectedFiles);
      
    }
  }
  onSubmit(){
    // console.log(this.taskTitle)

    const formData = new FormData();
    console.log(this.id+' '+this.taskId)
    this.selectedFiles.forEach(file => {
      const baseName = file.name
      const baseNameNorm = baseName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const taskTitle = this.taskTitle.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const finalName = taskTitle+'_'+baseNameNorm
      const renamedFile = new File([file], finalName)
      formData.append('files', renamedFile); // 'files' doit correspondre au nom attendu côté Node
    });
    formData.append('taskId', this.taskId)
    formData.append('subtaskId', this.id)
    formData.append('taskTitle', this.taskTitle)
    this.liaison.uploadFiles(formData).then(data => data.subscribe(
      element => {
        console.log(element)
        this.getFiles()
      }
    ))
    this.selectedFiles = []
  }
  getFileLink(fileName:string){
    const url = this.liaison.URL+'uploads/'+fileName
    return url
  }

  getFiles(){
    this.images = []
    this.autres = []
    // console.log(this.id)
    this.liaison.getFiles(this.id).then(data => data.subscribe(
      element => {
        this.fichiers = element
        console.log(this.fichiers);
        
        this.fichiers.forEach(fichier => {
          const extension = fichier.filename.split('.').pop()?.toLowerCase();

          const extensionsImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];

          if (extension && extensionsImage.includes(extension)) {
            this.images.push(fichier);
          } else {
            this.autres.push(fichier);
          }
        });
      }
    ))
  }
  openPic(pic:FileInterface){
    const positionStrategy =  this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically()

    const overlayRef = this.overlay.create({
      hasBackdrop:true,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block()
    })
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose()
    })
    const fileListPortal = new ComponentPortal(PicLook)
    const componentRef = overlayRef.attach(fileListPortal)
    componentRef.instance.picture = pic
  }

  download(){
    console.log('downloading')
  }
  onDownload(filename: string) {
    this.liaison.downloadFile(filename).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  onDelete(id:string){
    if (id) {
      // console.log(id)
      this.liaison.deleteFile(id).then( data => data.subscribe(
        element => {
          this.action.emit('maj')
          this.getFiles()
        }
      ))
    }
    
    // const id = item.id
  }
}
