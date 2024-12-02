using {my_bookshop as my} from '../db/schema';

service BookshopService {

    entity Books as projection on my.Books;
    entity Authors as projection on my.Authors;
    entity Orders as projection on my.Orders;

    annotate Books with @readonly;
    annotate Authors with @readonly;

    annotate Books with @(restrict: [{grant: ['READ'], to: ['bookviewer']}]);
    annotate Authors with @(restrict: [{grant: ['READ'], to: ['bookviewer']}]);
    annotate Orders with @(restrict: [{grant: ['*'], to: ['orderadmin']}, {grant: ['READ'], to: ['orderviewer']}]);
}