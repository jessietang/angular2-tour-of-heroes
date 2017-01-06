/**
 * Created by jessietang on 1/6/2017.
 */

//Angular 的基本版Observable实现中，RxJS 操作符是不可用的。 我们得导入它们，以扩展Observable
//我们把整个应用中要用的那些 RxJS Observable扩展组合在一起，放在一个单独的 RxJS 导入文件中

//Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

//Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
