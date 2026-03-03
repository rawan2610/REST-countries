import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from '../core/services/loading.service';



@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  loadingService = inject(LoadingService);
}