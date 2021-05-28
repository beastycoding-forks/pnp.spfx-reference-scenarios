import {
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  BaseBasicCardView,
  IBasicCardParameters
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AceTeamTimezoneAdaptiveCardExtensionStrings';
import { wc } from '../../../webparts/worldClock/services/wc.service';
import { IAceTeamTimezoneAdaptiveCardExtensionProps, IAceTeamTimezoneAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../AceTeamTimezoneAdaptiveCardExtension';

export class CardView extends BaseBasicCardView<IAceTeamTimezoneAdaptiveCardExtensionProps, IAceTeamTimezoneAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IBasicCardParameters {
    const viewName: string = wc.Config.views[wc.Config.defaultViewId].viewName;
    const description: string = strings.CardDescription.replace("${viewName}", viewName);
    return {
      title: "",
      iconProperty: "",
      primaryText: description
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: this.state.teamsUrl
      }
    };
  }
}
