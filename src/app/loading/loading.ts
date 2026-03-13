import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from '../core/services/loading-controlling-spinner.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loading.html',
  styleUrls: ['./loading.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  //This component reads the state from the service
  //Why we need the TS file for the loader component even we have the interceptor and it injects the service too ?
  //The interceptor only mutates the state.,The UI needs a component to render something.The component injects the same service instance which is singleton, so it can read the current state that is shared accross the whole app.

  loadingService = inject(LoadingService);

  // Interceptor	Tells service: “loading started/ended”/sets the state in service
  // Service	Holds the state: isLoading = true/false->holds reactive state (signal)
  // LoaderComponent	Reads state and updates the DOM->reads the state and renders spinner HTML
  //injecting in 2 places is not duplication
  // Without the LoaderComponent: You can set isLoading = true in the service ,But nothing will actually show a spinner in the UI

  //Why we inject the service in both places ?? Interceptor: mutates the state (calls show()/hide()) ,,Component: reads the state (isLoading()) so the template file/html file knows about it
}
