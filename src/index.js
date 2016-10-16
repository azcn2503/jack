import webdriver, { By, until, wait, Key } from "selenium-webdriver";
import "babel-polyfill";

export default class Jack {
  constructor(hitList = []) {
    this.webdriver = webdriver;
    this.driver = new webdriver.Builder().forBrowser('chrome').build();
    this.By = By;
    this.until = until;
    this.wait = wait;
    this.Key = Key;
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

      let actionResults = [];

      for (let j in prey.actions) {
        const action = prey.actions[j];
        try {
          const actionResult = await action(actionResults, (data) => { actionResults.push(data); });
        } catch (e) {
          console.error(e);
          actionResults.push(null);
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
