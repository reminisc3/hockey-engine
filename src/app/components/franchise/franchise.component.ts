import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-franchise',
    templateUrl: './franchise.component.html',
    styleUrls: ['./franchise.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FranchiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
