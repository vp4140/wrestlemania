import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enter-wrestler-details',
  templateUrl: './enter-wrestler-details.component.html',
  styleUrls: ['./enter-wrestler-details.component.scss']
})
export class EnterWrestlerDetailsComponent {
  @Output() submitWrestler = new EventEmitter<any>();
  images=["../../assets/charlotte-flair.png","../../assets/john-cena-render-1-png-clipart.jpg","../../assets/The-Rock-PNG-Picture.png","../../assets/WWE-PNG-Free-Download.png"]

  wrestlerForm: FormGroup;
  playersObj:any;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<EnterWrestlerDetailsComponent>,private cdr: ChangeDetectorRef) {
    this.wrestlerForm = this.fb.group({
      name: ['', Validators.required],
      health: [100, [Validators.required, Validators.min(0), Validators.max(100)]],
      moves: this.fb.array([]),
    });
  }

  addMove() {
    const moves = this.wrestlerForm.get('moves') as any;

    moves.push(this.fb.group({
      name: ['', Validators.required],
      damage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      type: ['', Validators.required],
    }));
    this.cdr.detectChanges();
  }

  removeMove(index: number) {

    const moves = this.wrestlerForm.get('moves') as any;
    moves.removeAt(index);
    this.cdr.detectChanges();
  }

  addPlayer() {
   
    this.playersObj = this.wrestlerForm.value
    if (this.wrestlerForm.valid) {
      this.submitWrestler.emit(this.wrestlerForm.value);
    }
 
    this.confirm()
  }

  getMovesControls() {
    return (this.wrestlerForm.get('moves') as FormArray).controls;
  }

cancel() {
  this.dialogRef.close({ type:'cancel',data: 'you cancelled' })
}

confirm() {
  this.dialogRef.close({ type:'confirm',data: this.playersObj })
  
}


}
