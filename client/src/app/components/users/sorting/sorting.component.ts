import {Component, Input, OnInit} from '@angular/core';
import {EntityList} from "../entity-list/entity-list.component";
import {PaginationService} from "../../../services/pagination.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'sorting-entities',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  @Input() entityListComponent: any;
  sortOptions: Array<object>;

  constructor(public paginationService: PaginationService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get(['empty.property', 'all.users.page.sort.by.first.name.up',
      'all.users.page.sort.by.first.name.down']).subscribe(
        (res) => this.sortOptions = Object.values(res));
  }

  sortPage(value: any) {
    this.entityListComponent.loading = true;
    this.paginationService.sortBy = value;
    this.paginationService.getPageByNumber(0, this.entityListComponent.name, value)
      .subscribe(
        data => this.entityListComponent.populateEntities(data),
        errorCode =>  this.entityListComponent.statusCode = errorCode,
        () => this.entityListComponent.loading = false)
  }

  getKey(option: string) {
    return option.substring(0, option.indexOf(';'));
  }

  getValue(option: string) {
    return option.substring(option.indexOf(';') + 1, option.length);
  }
}
