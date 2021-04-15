import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";
import isEqual from "lodash/isEqual";

import styles from "../CovidAdmin.module.scss";
import strings from "CovidWebPartStrings";
import { cs } from "../../services/covid.service";
import Dialog from "../molecules/Dialog";
import Button from "../atoms/Button";

export enum DIALOGS {
  "LOCATIONS",
  "QUESTIONS"
}

export interface ICovidAdministrationProps { }

export interface ICovidAdministrationState {
  locationsVisible: boolean;
  questionsVisible: boolean;
}

export class CovidAdministrationState implements ICovidAdministrationState {
  constructor(
    public locationsVisible: boolean = false,
    public questionsVisible: boolean = false
  ) { }
}

export default class CovidAdministration extends React.Component<ICovidAdministrationProps, ICovidAdministrationState> {
  private LOG_SOURCE: string = "🔶CovidAdministration";

  constructor(props: ICovidAdministrationProps) {
    super(props);
    this.state = new CovidAdministrationState();
  }

  public shouldComponentUpdate(nextProps: ICovidAdministrationProps, nextState: ICovidAdministrationState) {
    if ((isEqual(nextState, this.state) && isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  private _changeLocationVisibility = async (visible: boolean): Promise<void> => {
    this.setState({ locationsVisible: visible });
    // if (visible) {
    //   this.setState({ questionsVisible: false });
    // }
  }
  private _changeQuestionsVisibility = async (visible: boolean): Promise<void> => {
    this.setState({ questionsVisible: visible });
    // if (visible) {
    //   this.setState({ locationsVisible: false });
    // }
  }

  public render(): React.ReactElement<ICovidAdministrationProps> {
    try {
      const styleBlock = { "height": `70vh`, "width": `56vw` } as React.CSSProperties;
      return (
        <div data-component={this.LOG_SOURCE}>
          <h1>{strings.AdministrationHeader}</h1>
          <p>{strings.AdministrationSubHeader}</p>
          <div className={`${styles.formRow} ${styles.buttons}`}>
            <Button label={strings.ManageLocations} className="hoo-button-primary" disabled={false} onClick={() => { this._changeLocationVisibility(true); }} />
            <Button label={strings.ManageQuestions} className="hoo-button-primary" disabled={false} onClick={() => { this._changeQuestionsVisibility(true); }} />
            <Dialog header={strings.ManageLocations} content="" visible={this.state.locationsVisible} onChange={this._changeLocationVisibility} width={60} height={80}>
              <iframe src={cs.LocationListUrl} style={styleBlock} />
            </Dialog>
            <Dialog header={strings.ManageQuestions} content="" visible={this.state.questionsVisible} onChange={this._changeQuestionsVisibility} width={60} height={80}>
              <iframe src={cs.QuestionListUrl} style={styleBlock} />
            </Dialog>
          </div>
        </div>
      );
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (render) - ${err}`, LogLevel.Error);
      return null;
    }
  }
}