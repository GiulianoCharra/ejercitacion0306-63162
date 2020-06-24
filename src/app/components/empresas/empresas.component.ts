import { Component, OnInit } from "@angular/core";
import { Empresa } from "../../models/Empresa";
import { EmpresasService } from "../../services/empresas.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: "app-empresas",
  templateUrl: "./empresas.component.html",
  styleUrls: ["./empresas.component.css"]
})
export class EmpresasComponent implements OnInit {
  Titulo = "Empresas";
  TituloAccion = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  Accion = "L";
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };
  Lista: Empresa[] = [];
  RegistrosTotal: number;
  SinBusquedasRealizadas = true;

  Pagina = 1; // inicia pagina 1
  FormFiltro: FormGroup;
  FormReg: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private empresasService: EmpresasService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormFiltro = this.formBuilder.group({
      RazonSocial: [""]
    });
    this.FormReg = this.formBuilder.group({
      IdArticulo: [0],
      Nombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      Precio: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      Stock: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      CodigoDeBarra: [
        "",
        [Validators.required, Validators.pattern("[0-9]{13}")]
      ],
      IdArticuloFamilia: ["", [Validators.required]],
      FechaAlta: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}"
          )
        ]
      ],
      Activo: [true]
    });

    this.GetEmpresa();
  }

  GetEmpresa() {
    this.empresasService.getEmp().subscribe((emp: Empresa[]) => {
      this.Lista = emp;
    });
  }

// Buscar segun los filtros, establecidos en FormReg
  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.empresasService
      .getEmp(this.FormFiltro.value.Nombre, this.FormFiltro.value.Activo, this.Pagina)
      .subscribe((res: any) => {
        this.Lista = res.Lista;
        this.RegistrosTotal = res.RegistrosTotal;
      });
  }

  Agregar() {
    this.Accion = "A";
    this.FormReg.reset(this.FormReg.value);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  ActivarDesactivar(Emp) {
    this.modalDialogService.Confirm(
      "Esta seguro de eliminar este registro?",
      undefined,
      undefined,
      undefined,
      () =>
        this.empresasService
          .delete(Emp.IdEmpresa)
          .subscribe((res: any) => this.Buscar()),
      null
    );
  }

  Volver() {
    this.Accion = "L";
  }
}
