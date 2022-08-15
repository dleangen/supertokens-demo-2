import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

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
  hasItems$!: Observable<boolean>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.items$ = this.db.collection('items')
      .valueChanges({idField: 'id'});

    this.hasItems$ = this.items$
      .pipe(
        map(items => !!items && items.length > 0),
      );
  }
}
