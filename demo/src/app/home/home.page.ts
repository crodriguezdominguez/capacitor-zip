import { Component, OnInit , NgZone} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Zip } from 'capacitor-zip';
import { FilesystemDirectory, FilesystemEncoding, Plugins } from '@capacitor/core';

const {Filesystem} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  zip: Zip;
  zipProgress: number = 0;
  unzipProgress: number = 0;
  hasFiles: boolean = false;
  hasZip: boolean = false;
  firstData = '';
  secondData = '';
  documentsDirectory = '';
  constructor(public navCtrl: NavController, private zone:NgZone) {
    this.zip = new Zip();
  }

  ngOnInit(): void {

    this.zipProgress = 0;
    this.unzipProgress =  0;
    Filesystem.getUri({directory:FilesystemDirectory.Documents, path:'/'}).then(data=>{
      this.documentsDirectory = data.uri;
      this.checkForFiles();
      this.checkForArchive();
    })
    .catch(err=>{
      alert('Get documents directory error: ' + err);
    });
  }


  async checkForArchive(){
    try {
      await Filesystem.stat({
        directory: FilesystemDirectory.Documents,
        path: 'testZip.zip'
      });

      this.zone.run(()=>{this.hasZip = true;});
    } catch (e) {
      console.log('checkForArchive', e);
    }
  }

  async checkForFiles() {
    try {
      await Filesystem.stat({
        directory: FilesystemDirectory.Documents,
        path: 'toZip/first.txt'
      });

      await Filesystem.stat({
        directory: FilesystemDirectory.Documents,
        path: 'toZip/second.txt'
      });

      this.zone.run(()=>{this.hasFiles = true;});
    } catch (e) {
      console.log('checkForFiles', e);
    }
  }

  async createFiles() {
    try {

      await Filesystem.mkdir({
        directory: FilesystemDirectory.Documents,
        path: 'toZip',
        createIntermediateDirectories: true
      });

      await Filesystem.writeFile({
        data: 'First File',
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
        path: 'toZip/first.txt'
      });

      await Filesystem.writeFile({
        data: 'Second File',
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
        path: 'toZip/second.txt'
      });
      this.zone.run(()=>{
        this.hasFiles = true;
      });
    } catch (e) {
      console.log('createFiles', e);
    }
  }

  async createZip() {
    try {
      await this.zip.zip({
        destination: `${this.documentsDirectory}/testZip.zip`,
        source: `${this.documentsDirectory}/toZip`
      }, (progress) => {
        this.zone.run(()=>{this.zipProgress = progress.value;});
      });
      this.zone.run(()=>{
        this.hasZip = true;
      });
    } catch (e) {
      alert('createZip fail: '+ e);
    }
  }

  async unzip() {
    try {
      await this.zip.unZip({
        source: `${this.documentsDirectory}/testZip.zip`,
        destination: `${this.documentsDirectory}/testZip`,
      }, (progress) => {
        this.unzipProgress = progress.value;
      });
      this.firstData = (await Filesystem.readFile({directory: FilesystemDirectory.Documents, path: '/toZip/first.txt'})).data;
      this.secondData = (await Filesystem.readFile({directory: FilesystemDirectory.Documents, path: '/toZip/second.txt'})).data;

    } catch (e) {
      alert('unzip fail: '+ e);
    }
  }


}