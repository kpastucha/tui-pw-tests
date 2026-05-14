import { BasePage } from './base.page.js';
import { ProgressBarNavigationComponent } from './components/progress.bar.navigation.component.js';

export class AccommodationDetailsPage extends BasePage {
  private _progressBarNavigationComponent?: ProgressBarNavigationComponent;

  get progressBarNavigationComponent(): ProgressBarNavigationComponent {
    return (this._progressBarNavigationComponent ??= new ProgressBarNavigationComponent(
      this.page,
      this.defaultLocator
    ));
  }
}
