import { Component, OnInit } from '@angular/core';
import { PatientService } from '../shared/patient.service';
import { Patient } from '../shared/patient.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
 patientList: Patient[];

  constructor(private patientService: PatientService) { }

  //loads our patient list from our Service into an array
  ngOnInit() {
    var patients = this.patientService.getData();
    patients.snapshotChanges().subscribe(item => {
      this.patientList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        if(y["credentials"]!= undefined){
          y["email"]= y["credentials"].email;
          y["name"]= y["credentials"].name;
          y["profilePicLink"]= y["credentials"].profilePicLink;
          this.patientList.push(y as Patient);
        }
      });
    });

  
  }

}
