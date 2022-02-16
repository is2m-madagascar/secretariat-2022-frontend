import { Component, OnDestroy, OnInit } from '@angular/core';
import { convertExcelToJson } from '../../../Shared/Utils/ExcelUtils';
import { FormControl } from '@angular/forms';
import { makeEnseignement } from '../../../Shared/Utils/EnseignementUtils';
import { EnseignementService } from '../../../Shared/Service/enseignement.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import NiveauxList from '../../../Shared/List/NiveauxList';
import { VariableService } from '../../../Shared/Service/variable.service';
import AnneeList from '../../../Shared/List/AnneeList';

@Component({
  selector: 'app-enseignement',
  templateUrl: './enseignement.component.html',
  styleUrls: ['./enseignement.component.css'],
})
export class EnseignementComponent implements OnInit, OnDestroy {
  fileControl = new FormControl('');
  multiple = false;
  jsonData: any = null;
  disabled = true;

  enseignement: any[] = [];
  anneeScolaire = AnneeList;
  selectedAnnee = new Date().getFullYear();
  mentions: Observable<any> = new Observable<any>();

  selectedAnneeForList = new Date().getFullYear();
  selectedNiveauForList = 'L1';
  selectedMentionForList = 'MI';

  enseignantList: Observable<any[]> = new Observable<any[]>();

  enseignementsFromServer: Observable<any> = new Observable<any>();

  niveaux = NiveauxList;
  selectedNiveau = 0;
  pageSize = 10;
  page = 1;
  loading = true;
  noContent = false;
  sub: Subscription[] = [];

  constructor(
    private enseignementService: EnseignementService,
    private variableService: VariableService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mentions = this.variableService.getMentions();
    this.getEnseignements();
  }

  onFileChange = (file: any) => {
    convertExcelToJson(file, (data: any) => {
      this.fileControl.setValue(data);
      this.disabled = false;
      console.log(this.fileControl.value);

      const niveaux = Object.keys(this.fileControl.value);
      niveaux.forEach((element: String) => {
        const niveau = element;
        // @ts-ignore
        const enseignement = this.fileControl.value[niveau];
        enseignement.forEach((ens: any) => {
          const vh = ens['sous-total'];
          this.enseignement.push(
            makeEnseignement(
              niveau,
              this.selectedAnnee,
              ens.EC,
              vh,
              ens.Semestre,
              ens.Enseignant
            )
          );
        });
      });

      console.log(this.enseignement);
    });
  };

  onImportClick = ($event: any) => {
    $event.preventDefault();
    let message = '';
    this.sub.push(
      this.enseignementService.importEnseignement(this.enseignement).subscribe(
        (_) => {
          message = 'Enseignements importés avec succès';
        },
        (_) => {
          message =
            "Une erreur est survenue lors de l'importation, veuillez reverifier les données";
        },
        () => {
          this._snackBar.open(message, 'OK');
        }
      )
    );
  };

  ngOnDestroy(): void {
    this.sub.forEach((element) => {
      element.unsubscribe();
    });
  }

  resetValue(): void {
    this.fileControl.setValue(null);
    this.disabled = true;
  }

  setTabChange = ($event: any) => {
    this.selectedNiveauForList = NiveauxList[$event];
    this.getEnseignements();
  };

  getEnseignements(pageIndex?: number, pageSize?: number): void {
    this.noContent = false;
    this.loading = true;
    this.enseignementsFromServer = this.enseignementService.getEnseignements(
      [
        { params: 'anneeScolaire', value: this.selectedAnneeForList },
        { params: 'niveauEnseigne', value: this.selectedNiveauForList },
        { params: 'mention.code', value: this.selectedMentionForList },
      ],
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    );

    this.sub.push(
      this.enseignementsFromServer.subscribe((data) => {
        this.loading = false;
        if (data.data.length === 0) {
          this.noContent = true;
        }
      })
    );
  }

  setAnneeForListChange($event: any) {
    this.selectedAnneeForList = $event.value;
    this.getEnseignements();
  }

  setMentionChanges($event?: any): void {
    this.selectedMentionForList = $event.value;
    this.getEnseignements();
  }

  getVolumeHoraireFromJson(value: any) {
    let volume = value.hours;
    volume += value.days * 24;
    return volume;
  }

  setPage($event: any) {
    this.getEnseignements($event.pageIndex, $event.pageSize);
  }
}
