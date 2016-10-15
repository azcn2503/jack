import webdriver, { By } from "selenium-webdriver";
import "babel-polyfill";

export default class Jack {
  constructor(hitList = []) {
    this.driver = new webdriver.Builder().forBrowser('chrome').build();
    this.By = By;
    this.hitList = hitList;
  }

  AddToHitList(address, actions) {
    this.hitList.push({ address, actions });
  }

  async Ripper() {
    for (let i in this.hitList) {
      let prey = this.hitList[i];
      if (!prey.address || !prey.actions) { continue; }
      if (typeof(prey.actions) !== 'object') { prey.actions = [prey.actions]; }
      console.log('...');
      console.log(`Approaching ${prey.address}`);
      try {
        const result = await this.driver.get(prey.address);
      } catch (e) {
        console.error(e);
        continue;
      }
      for (let j in prey.actions) {
        const action = prey.actions[j];
        try {
          const actionResult = await action();
        } catch (e) {
          console.error(e);
          continue;
        }
        console.log('Done!');
      }
      console.log(`Striking ${prey.address} off the list`);
    }
    this.Teardown();
  }

  Teardown() {
    this.driver.quit();
  }
}
