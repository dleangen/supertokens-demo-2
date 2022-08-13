import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class ItemsComponent implements OnInit {

  items$!: Observable<any>;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.items$ = this.db.collection('items')
      .valueChanges({idField: 'id'});
  }
}
