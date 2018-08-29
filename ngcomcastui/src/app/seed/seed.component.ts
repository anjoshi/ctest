import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeedService } from "../services/seed.service";

@Component({
  selector: 'app-seed',
  templateUrl: './seed.component.html',
  styleUrls: ['./seed.component.scss']
})
export class SeedComponent implements OnInit {
  public seed = {
    id: null,
    attribSet: []
  };
  minTemp = 35;
  maxTemp = 100;
  value : number;
  isActive : boolean = false;

  private press(): void {
    this.isActive = true;
    console.log(this.isActive = true);
  }

  private release(): void {
    this.isActive = false;
    this.seed.attribSet[0].temperature = this.value;
    this.seedService.setNestData(this.seed.id, this.seed.attribSet)
    .then(obj => {
      console.log('success in saving');
    })
    .catch(e => {
      console.error('service error');
    })
  }

  constructor(private seedService: SeedService) {
    seedService.getNestDetails()
    .then(obj => {
      this.seed.id = obj.seedId;
      this.seed.attribSet.push(JSON.parse(JSON.stringify(obj.attribSet[0])));
      if(!this.seed.attribSet[0].temperature) {
        this.value = 65;
      }
    })
    .catch(e => {
      console.error('Service error ' + e);
    });
  }

  ngOnInit() {
  }

}
