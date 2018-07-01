import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {EntityList} from "../entity-list/entity-list.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../services/user.service";
import {PaginationService} from "../../services/pagination.service";
import {AddEditEntityComponent} from "../add-edit-entity/add-edit-entity.component";
import {SearchResultListComponent} from "./search-result-list/search-result-list.component";
import {SearchResultComponent} from "./search-result/search-result.component";
import {User} from "../../models/user.model";
declare var $ : any;

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('searchState', [
      state('inactive', style({
        width: '30px',
      })),
      state('active',   style({
        width: '200px',
      })),
      transition('inactive <=> active', animate('200ms ease-out'))
    ])
  ]
})
export class SearchComponent implements OnInit {

  @Input() entityListComponent: EntityList;
  results: User[] = [];
  searchState: string = 'inactive';
  @ViewChild('searchResult', {read: ViewContainerRef}) searchResultContainerRef;
  expComponent: ComponentRef<any>;
  loading: boolean;


  constructor(private userService: UserService,
              private paginationService: PaginationService,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  search(value: any) {
    if (value && value.length > 1) {
      this.userService.searchByFirstOrLastName(value)
        .subscribe(
          data => {
            this._populateSearchResults(data);
            this._showSearchResult();
          },
          errorCode =>  this.entityListComponent.statusCode = errorCode,
          () => this.expComponent.instance._loading = false
        );
    }
  }

  _showSearchResult () {
    const factory = this.componentFactoryResolver.resolveComponentFactory(SearchResultListComponent);
    this.searchResultContainerRef.clear();
    this.expComponent =  this.searchResultContainerRef.createComponent(factory);
    this.expComponent.instance._searchResults = this.results;
    // $("body").append('<div class="modal-backdrop fade in"></div>')
  }

  resetInput(searchInput: any) {
    searchInput.value = "";
    this.expComponent.destroy();
  }

  private _populateSearchResults(data: any) {
    this.results = data["_embedded"].users;
  }
}
