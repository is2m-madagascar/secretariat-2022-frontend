import { Component, OnDestroy, OnInit } from "@angular/core";
import { InscriptionsService } from "../../../Shared/Service/inscriptions.service";
import { NiveauService } from "src/app/Shared/Service/niveau.service";
import { MentionService } from "src/app/Shared/Service/mention.service";
import AnneeList from "../../../Shared/List/AnneeList";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit, OnDestroy {

  inscriptions: any[] = [];
  responseSize: any = null;
  responsePage: any = null;
  mentions: any[] = [];
  niveaux: any[] = [];

  annees = AnneeList;

  //Page config
  loading = true;
  noContent = false;
  pageSize = 10;
  page = 1;
  //End page config

  //form
  selectedNiveau = new FormControl();
  selectedMention = new FormControl();
  selectedAnnee = new FormControl(new Date().getFullYear());
  //end Form

  //columns
  displayedColumns: string[] = ['Matricule', 'Nom', 'Prénom', 'Actions'];
  dataSource = new MatTableDataSource<any>(this.inscriptions);
  //end columns

  constructor(
    private inscriptionService: InscriptionsService,
    private niveauxService: NiveauService,
    private mentionService: MentionService
  ) {}

  ngOnDestroy(): void {
  }

  async ngOnInit() {
    new Promise(async () => {
      await this.getNiveaux();
      await this.getMentions();
    }).then(async () => {
      await this.getInscription();
    })
  }

  async getInscription(pageIndex?: number, pageSize?: number){
    const params = [
      this.makeNiveauParams(),
      this.makeAnneeParams(),
      await this.makeMentionParams(),
    ]
    const temp: any = await this.inscriptionService.getInscriptionsV2(
      params,
      pageIndex ? pageIndex + 1 : this.page,
      pageSize ? pageSize : this.pageSize
    )
    console.log(temp)
    this.inscriptions = temp?.data[0];
    this.responseSize = temp?.message.pagination.totalElements;
    this.responsePage = temp?.message.pagination.pageIndex;
    this.dataSource = new MatTableDataSource<any>(this.inscriptions);
    return this.inscriptions;
  }

  async getNiveaux(){
    this.niveaux = (await this.niveauxService.getNiveauxV2()).data[0];
    this.selectedNiveau.setValue(this.niveaux[0]||null);
    return this.niveaux;
  }

  async getMentions(){
    this.mentions = (await this.mentionService.getMentionV2()).data[0];
    this.selectedMention.setValue(this.mentions[0]||null);
    return this.mentions;
  }

  async setTabChange($event: any){
    this.selectedNiveau.setValue($event);
    await this.getInscription();
  }

  async setPage($event: any){
    await this.getInscription($event.pageIndex, $event.pageSize);
  }

  private makeNiveauParams() {
    try{
      let value = this.niveaux[this.selectedNiveau.value]._id
      return { params: 'niveau', value }
    }
    catch(e){
      console.error(e)
    }
    return null;
  }

  private makeAnneeParams() {
    return { params: 'anneeScolaire', value: this.selectedAnnee.value };
  }

  private async makeMentionParams() {
    try{
      //@ts-ignore
      let value = this.selectedMention.value || (await this.mentionService.getMentionV2()).data[0][0]
      return { params: 'mention', value: value._id }
    }
    catch(e){
      console.error(e)
    }
    return null;
  }
}
