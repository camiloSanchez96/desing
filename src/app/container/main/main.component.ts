import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogUpdateComponent } from './dialogs/dialog-update/dialog-update.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public requetType = {
    update: 1,
    insert: 2,
    delete: 3,
  };
  loadButton = false;
  public subcriptionRequest: Subscription;
  source: LocalDataSource;
  public settings = {
    mode: 'external',
    sort: true,
    attr: {
      class: 'List',
    },
    editable: true,
    add: {
      addButtonContent: '<i class="fas fa-plus"></i>',
    },
    actions: {
      position: 'left',
      edit: true,
      delete: true,
      add: true,
    },

    columns: {
      id: {
        title: 'id',
        editable: false,
        sortDirection: 'asc'
      },
      central: {
        title: 'Central',

      },
      mercado: {
        title: 'Mercado'
      },
      pais: {
        title: 'País'
      },
    }
  };

  constructor(private requets: RequestsService, private toastr: NbToastrService, private dialog: NbDialogService) { }

  ngOnInit(): void {
  }

  getInfo() {
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
    this.loadButton = true;
    this.subcriptionRequest = this.requets.get().subscribe((res: any) => {
      this.source = new LocalDataSource(res);
      this.toastr.show('Información obtenida', 'Done!');
      this.loadButton = false;
    }, err => {
      this.toastr.warning(err, 'Error');
      this.loadButton = false;
    });
  }

  openDialog(event, index) {
    const dialog = this.dialog.open(DialogUpdateComponent,
      {
        closeOnBackdropClick: false, closeOnEsc: false, autoFocus: false,
        context: index !== 2 ? {
          placeholder: { central: event.data.central, mercado: event.data.mercado, pais: event.data.pais },
          updateInfo: { id: event.data.id },
          processNumber: index,
        } :  {
          placeholder: { central: 'Nueva', mercado: 'Nuevo', pais: '' },
          updateInfo: { id: 0 },
          processNumber: index,
        }
      })
      .onClose.subscribe(resp => {
        if (resp === 1) {
          this.getInfo();
        }
      });
  }

  ngOnDestroy() {
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
  }

}
